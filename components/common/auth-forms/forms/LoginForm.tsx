import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormType, LoginDto } from "../../../../utils/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormSchema } from "../../../../utils/validators";
import { Api } from "../../../../utils/api";
import { useAppDispatch } from "../../../../redux/hooks";
import { setUserData } from "../../../../redux/slices/user";
import { isAxiosError } from "axios";
import { setFormType, setVisibleForm } from "../../../../redux/slices/common";
import Image from "next/image";

import styles from "./LoginForm.module.scss";
import Eye from "../../../../public/icons/eye.svg";
import Spinner from "../../../../public/icons/spinner.svg";
import { useRouter } from "next/router";

export const LoginForm: FC<FormType> = ({ type }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginDto>({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });
  const dispatch = useAppDispatch();

  const handleClickOnShowPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (dto: LoginDto) => {
    try {
      setError("");
      const data = await Api().user.login(dto);
      dispatch(setUserData(data));
      dispatch(setVisibleForm(false));
      dispatch(setFormType(null));
      if (type === "page") {
        await router.push("/profile");
      }
    } catch (err) {
      console.warn("Register error", err);
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
        <h2 className={styles.form__title}>Авторизация</h2>
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
                styles.form__show,
                showPassword && "active"
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
          {error && <div className="mb-20 text-red">{error}</div>}
          <div className={styles.form__buttons}>
            <Link className={styles.form__forgot} href={"/forgot-password"}>
              Забыл пароль
            </Link>
            <button
              className={classNames(
                "btn",
                styles.form__submit,
                (!isValid || isSubmitting) && "btn-disabled"
              )}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Войти"}
            </button>
          </div>
        </form>
      </div>
      <div
        className={classNames(styles.form__footer, type === "page" && "w-full")}
      >
        Еще нет аккуанта?
        <Link className={styles.form__footer_link} href={"/registration"}>
          Зарегистрироваться
        </Link>
      </div>
    </>
  );
};
