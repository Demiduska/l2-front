import React, { FC, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CreateUserDto, FormType } from "../../../../utils/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Api } from "../../../../utils/api";
import { setUserData } from "../../../../redux/slices/user";
import axios, { isAxiosError } from "axios";
import { useAppDispatch } from "../../../../redux/hooks";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { RegisterFormSchema } from "../../../../utils/validators";

import styles from "./LoginForm.module.scss";
import Eye from "../../../../public/icons/eye.svg";
import Spinner from "../../../../public/icons/spinner.svg";

export const RegisterForm: FC<FormType> = ({ type, setStep }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateUserDto>({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchema),
  });
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleClickOnShowPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      setError("");
      if (executeRecaptcha) {
        const token = await executeRecaptcha();
        if (!token) {
          setError("Failed to Send!!!");
          return;
        }
        const captchaResponse = await axios.post("/api/recaptcha", {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: {
            token: token,
          },
        });

        if (
          process.env.NEXT_PUBLIC_NODE_ENV === "dev" ||
          (captchaResponse.status === 200 &&
            captchaResponse.data.status === "success")
        ) {
          const data = await Api().user.register(dto);
          dispatch(setUserData(data));
          if (setStep) {
            setStep(2);
          }
        } else {
          setError(captchaResponse.data.message);
        }
      }
    } catch (err) {
      console.warn("Register error", err);
      setError("Smth wrong... Try again");
      if (isAxiosError(err) && err.response) {
        setError(err.response?.data.message);
      }
    }
  };

  return (
    <>
      <div
        className={classNames(
          styles.form_wrap,
          type === "page" && styles.form_wrap__page
        )}
      >
        <h2 className={styles.form__title}>Регистрация аккаунта</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="email">
            <input
              type="email"
              placeholder="Email"
              className={classNames("input", {
                "input--error": errors?.email,
              })}
              {...register("email")}
            />
            {errors.email?.message && (
              <span className={classNames("text-red", "text-error")}>
                {errors.email?.message}
              </span>
            )}
          </label>
          <label className={styles.form__label} htmlFor="password">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={classNames("input", {
                "input--error": errors?.password,
              })}
              {...register("password")}
            />
            <a
              className={classNames(
                showPassword && "active",
                styles.form__show
              )}
              onClick={handleClickOnShowPassword}
            >
              <Eye />
            </a>
            {errors.password?.message && (
              <span className={classNames("text-red text-error")}>
                {errors.password?.message}
              </span>
            )}
          </label>
          <label className={styles.form__label} htmlFor="confirmPassword">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              className={classNames("input", {
                "input--error": errors?.confirmPassword,
              })}
              {...register("confirmPassword")}
            />
            <a
              className={classNames(
                showPassword && "active",
                styles.form__show
              )}
              onClick={handleClickOnShowPassword}
            >
              <Eye />
            </a>
            {errors.confirmPassword?.message && (
              <span className={classNames("text-red text-error")}>
                {errors.confirmPassword?.message}
              </span>
            )}
          </label>
          {error && <div className="mb-20 text-red">{error}</div>}
          <div className={styles.form__buttons}>
            <button
              className={classNames(
                "btn w-full",
                styles.form__submit,
                (!isValid || isSubmitting) && "btn-disabled"
              )}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Создать аккаунт"}
            </button>
          </div>
        </form>
      </div>
      <div
        className={classNames(styles.form__footer, type === "page" && "w-full")}
      >
        Уже есть аккаунт?
        <Link className={styles.form__footer_link} href={"/login"}>
          Войти
        </Link>
      </div>
    </>
  );
};
