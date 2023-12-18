import { FC } from "react";
import Image from "next/image";
import { NotificationForm } from "../common/auth-forms/forms/NotificationForm";

import styles from "./Notification.module.scss";
import back from "../../public/images/notification-back.png";
import sword from "../../public/images/img-sword.png";
import classNames from "classnames";

export const Notification: FC = () => {
  return (
    <div className={styles.notification}>
      <Image
        className={styles.notification__back}
        src={back}
        alt={"back"}
        quality={100}
      />
      <Image
        className={classNames(
          styles.notification__back,
          styles.notification__back_sword
        )}
        src={sword}
        alt={"back-sword"}
        quality={100}
      />
      <div className={styles.notification__content}>
        <h2 className={styles.notification__title}>
          Получай топовые Lineage 2 сервера любимых хроник{" "}
          <span className={"text-blue"}>
            на электронную почту или в Telegram
          </span>
        </h2>
        <div>Узнавай о новых серверах одним из первых</div>
      </div>
      <NotificationForm />
    </div>
  );
};
