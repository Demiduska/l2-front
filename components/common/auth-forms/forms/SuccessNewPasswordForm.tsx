import React, { FC } from "react";
import { FormType } from "../../../../utils/api/types";
import classNames from "classnames";
import Link from "next/link";

import styles from "./LoginForm.module.scss";
import Checkbox from "../../../../public/icons/checkbox-success.svg";
import { useAppSelector } from "../../../../redux/hooks";
import { selectUserData } from "../../../../redux/slices/user";

export const SuccessNewPasswordForm: FC<FormType> = ({ type }) => {
  const userData = useAppSelector(selectUserData);

  return (
    <>
      <div
        className={classNames(
          styles.form_wrap,
          type === "page" && styles.form_wrap__page
        )}
      >
        <div className={styles.form_wrap__icon}>
          <Checkbox />
        </div>
        <h2
          className={classNames(styles.form__title, styles.form__title_success)}
        >
          Новый пароль установлен
        </h2>
        <Link
          href={"/login"}
          className={classNames("btn", styles.form__button_link)}
        >
          Войти
        </Link>
      </div>
      <div
        className={classNames(styles.form__footer, type === "page" && "w-full")}
      />
    </>
  );
};
