import React, { FC } from "react";
import { FormType } from "../../../../utils/api/types";
import classNames from "classnames";
import Link from "next/link";

import styles from "./LoginForm.module.scss";
import Rocket from "../../../../public/icons/rocket.svg";
import { useAppSelector } from "../../../../redux/hooks";
import { selectUserData } from "../../../../redux/slices/user";

export const ServerModerationForm: FC<FormType> = ({ type }) => {
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
          <Rocket />
        </div>
        <h2
          className={classNames(styles.form__title, styles.form__title_success)}
        >
          Ваш сервер отправлен на модерацию
        </h2>
        <p className={classNames(styles.form__text)}>
          Обычно модерация занимает не более получаса в дневное время, а в
          ночное время может доходить до 8 часов.
        </p>
        <Link
          href={"/profile/servers"}
          className={classNames("btn", styles.form__button_link)}
        >
          Мои серверы
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
