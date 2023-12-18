import React, { FC, RefObject, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { FormType } from "../../../../utils/api/types";

import styles from "./LoginForm.module.scss";

export const SuccessPasswordForm: FC<FormType> = ({ type, setStep }) => {
  const [timer, setTimer] = useState<number>(60);
  const tick = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    tick.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(tick.current as NodeJS.Timeout);
  }, []);

  if (timer === 0) clearInterval(tick.current as NodeJS.Timeout);

  return (
    <>
      <div
        className={classNames(
          styles.form_wrap,
          type === "page" && styles.form_wrap__page
        )}
      >
        <h2 className={styles.form__title}>Письмо отправлено</h2>
        <p className={classNames(styles.form__text)}>
          Перейдите по ссылке из письма и установите новый пароль для аккаунта
        </p>
        <div className={styles.form}>
          <div className={styles.form__buttons}>
            <button
              className={classNames(
                "btn",
                timer !== 0 && "btn--disabled",
                "w-full",
                styles.form__submit
              )}
              onClick={() => (setStep ? setStep(1) : null)}
            >
              Отправить повторно {timer !== 0 && `через ${timer} с`}
            </button>
          </div>
        </div>
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
