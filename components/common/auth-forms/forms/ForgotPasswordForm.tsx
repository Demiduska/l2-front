import React, { FC, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ForgotPasswordDto, FormType } from "../../../../utils/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordFormSchema } from "../../../../utils/validators";
import { Api } from "../../../../utils/api";
import axios, { isAxiosError } from "axios";

import styles from "./LoginForm.module.scss";
import Spinner from "../../../../public/icons/spinner.svg";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const ForgotPasswordForm: FC<FormType> = ({ type, setStep }) => {
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordDto>({
    mode: "onChange",
    resolver: yupResolver(ForgotPasswordFormSchema),
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (dto: ForgotPasswordDto) => {
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
          await Api().user.forgotPassword(dto);
          if (setStep) {
            setStep(2);
          }
        } else {
          setError(captchaResponse.data.message);
        }
      }
    } catch (err) {
      console.warn("error", err);
      if (isAxiosError(err) && err.response) {
        setError(err.response?.data.message);
      }
      setError("Something went wrong, try again");
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
        <h2 className={styles.form__title}>Восстановление пароля</h2>
        <p className={classNames(styles.form__text)}>
          Введите электронный адрес и мы вышлем на него ссылку для установки
          нового пароля
        </p>
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
          {error && <div className="mb-20 text-red">{error}</div>}
          <div className={styles.form__buttons}>
            <button
              className={classNames(
                "btn",
                "w-full",
                styles.form__submit,
                (!isValid || isSubmitting) && "btn-disabled"
              )}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Отправить"}
            </button>
          </div>
        </form>
      </div>
      <div
        className={classNames(styles.form__footer, type === "page" && "w-full")}
      >
        Вспомнили пароль?
        <Link className={styles.form__footer_link} href={"/login"}>
          Войти
        </Link>
      </div>
    </>
  );
};
