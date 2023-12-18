import React, { FC, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { FormType, SetNewPasswordDto } from "../../../../utils/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SetNewPasswordFormSchema } from "../../../../utils/validators";
import { Api } from "../../../../utils/api";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";

import styles from "./LoginForm.module.scss";
import Eye from "../../../../public/icons/eye.svg";
import Spinner from "../../../../public/icons/spinner.svg";

export const NewPasswordForm: FC<FormType> = ({ type, setStep }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const { token } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SetNewPasswordDto>({
    mode: "onChange",
    resolver: yupResolver(SetNewPasswordFormSchema),
    defaultValues: {
      token: token,
    },
  });

  const handleClickOnShowPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (dto: SetNewPasswordDto) => {
    try {
      setError("");
      await Api().user.setNewPassword(dto);
      if (setStep) {
        setStep(2);
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
        <h2 className={styles.form__title}>Установите новый пароль</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("token")} />
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
                "btn",
                "w-full",
                styles.form__submit,
                (!isValid || isSubmitting) && "btn-disabled"
              )}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Подвердить"}
            </button>
          </div>
        </form>
      </div>
      <div />
    </>
  );
};
