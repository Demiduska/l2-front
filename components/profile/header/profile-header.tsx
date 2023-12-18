import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";
import classNames from "classnames";
import Image from "next/image";

import Calendar from "../../../public/icons/profile/calendar.svg";
import Wallet from "../../../public/icons/profile/wallet.svg";
import System from "../../../public/icons/profile/system.svg";
import { useState } from "react";

import styles from "./ProfileHeader.module.scss";
import { generateFileUrl } from "../../../utils/helpers/generateFileUrl";

export const ProfileHeader = () => {
  const userData = useAppSelector(selectUserData);
  const [hide, setHide] = useState<boolean>(true);

  return (
    <>
      {!userData?.isEmailConfirmed && hide && (
        <div className={styles.header__confirmation}>
          <div className={styles.header__confirmation_text}>
            <System />
            Подтвердите email, перейдя по ссылке в письме, которое придет на ваш
            электронный адрес: {userData && userData.email}
          </div>
          <button
            className={styles.header__confirmation_button}
            onClick={(e) => setHide(false)}
          >
            Закрыть
          </button>
        </div>
      )}
      <div className={styles.header}>
        <div className={styles.header__logo}>
          {userData?.avatarId && userData.avatar?.path ? (
            <Image
              src={generateFileUrl(userData.avatar.path)}
              width={165}
              height={165}
              alt={"avatar"}
              quality={100}
            />
          ) : (
            <span className={styles.header__logo_text}>
              {userData && userData.email.slice(0, 1)}
            </span>
          )}
        </div>
        <div className={styles.header__info}>
          <h1 className={classNames(styles.header__info_name, "mb-sm-6 mb-18")}>
            {userData && userData.email}
          </h1>
          <div className={classNames(styles.header__info_register, "mb-24")}>
            <Calendar /> Присоединился{" "}
            {userData &&
              new Date(userData.registeredAt).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
          </div>
          <div className={styles.header__info_balance}>
            <div className={styles.header__info_amount}>
              <Wallet /> {userData && userData.balance} ₽
            </div>
            <button
              className={classNames(
                "btn btn--gradient",
                styles.header__info_button
              )}
            >
              Пополнить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
