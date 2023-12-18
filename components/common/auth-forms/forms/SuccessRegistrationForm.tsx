import React, { FC } from "react";
import { FormType } from "../../../../utils/api/types";
import classNames from "classnames";
import Link from "next/link";

import styles from "./LoginForm.module.scss";
import Checkbox from "../../../../public/icons/checkbox-success.svg";
import { useAppSelector } from "../../../../redux/hooks";
import { selectUserData } from "../../../../redux/slices/user";

export const SuccessRegistrationForm: FC<FormType> = ({ type }) => {
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
          Ваш аккаунт создан
        </h2>
        <p className={classNames(styles.form__text, styles.form__text_success)}>
          Подтвердите регистрацию, перейдя по ссылке в письме, которое придет на
          ваш электронный адрес:
        </p>
        <h3 className={classNames(styles.form__title_email)}>
          {userData?.email}
        </h3>
        <p className={classNames(styles.form__text)}>
          Если вы ошиблись при вводе адреса электронной почты, нажмите{" "}
          <Link className={"link--blue"} href={"/profile"}>
            здесь
          </Link>
          , чтобы изменить адрес электронной почты.
        </p>
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
