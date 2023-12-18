import React, { FC } from "react";
import { FormType } from "../../../../utils/api/types";
import classNames from "classnames";
import Link from "next/link";

import styles from "./LoginForm.module.scss";
import Checkbox from "../../../../public/icons/checkbox-success.svg";

export const ConfirmEmailForm: FC<FormType> = ({ type, status }) => {
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
          {status}
        </h2>
        <Link
          href={"/add-server"}
          className={classNames("btn", styles.form__button_link)}
        >
          Добавить сервер
        </Link>
        <Link
          href={"/"}
          className={classNames(
            "btn btn--black-light",
            styles.form__button_link
          )}
        >
          На главную страницу
        </Link>
      </div>
      <div
        className={classNames(styles.form__footer, type === "page" && "w-full")}
      />
    </>
  );
};
