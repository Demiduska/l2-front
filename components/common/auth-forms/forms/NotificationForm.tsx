import { FC } from "react";

import { FilterCheckbox } from "../../../inputs/checkbox/FilterCheckbox";
import classNames from "classnames";

import styles from "./NotificationForm.module.scss";
import Mail from "../../../../public/icons/mail.svg";
import Telegram from "../../../../public/icons/telegram.svg";

export const NotificationForm: FC = () => {
  return (
    <form className={styles.form}>
      <h3 className={styles.form__title}>
        Выбери интересующие хроники и способ получения рассылки 👇
      </h3>
      <div className={styles.form__inputs}>
        <FilterCheckbox
          key={0}
          title={"Interlude"}
          value={0}
          name={"chronics"}
        />
        <FilterCheckbox
          key={1}
          title={"High five"}
          value={1}
          name={"chronics"}
        />
        <FilterCheckbox key={2} title={"classic"} value={2} name={"chronics"} />
        <FilterCheckbox key={3} title={"essence"} value={3} name={"chronics"} />
      </div>
      <div className={styles.form__buttons}>
        <button className={classNames("btn btn--transparent btn--icon")}>
          <Mail />
          Получать по почте
        </button>
        <button className={classNames("btn btn--icon")}>
          <Telegram />
          Получать в Telegram
        </button>
      </div>
    </form>
  );
};
