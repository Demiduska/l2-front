import { FC } from "react";
import Link from "next/link";

import styles from "./SocialListIn.module.scss";
import Skype from "../../public/icons/skype.svg";
import Telegram from "../../public/icons/telegram.svg";

export interface ISocialListInItem {
  type: string;
  link: string;
  text: string;
}

type SocialListInType = {
  items: ISocialListInItem[];
};

export const SocialListIn: FC<SocialListInType> = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li className={styles.list__item} key={index}>
          <Link className={styles.list__link} href={item.link}>
            <>
              <div className={styles.list__icon}>
                {item.type === "skype" ? (
                  <Skype />
                ) : item.type === "telegram" ? (
                  <Telegram />
                ) : (
                  ""
                )}
              </div>
              <span className={styles.list__header}>Связаться</span>
              <span className={styles.list__text}>{item.text}</span>
            </>
          </Link>
        </li>
      ))}
    </ul>
  );
};
