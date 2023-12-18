import { FC } from "react";
import Link from "next/link";

import styles from "./SocialList.module.scss";
import TG from "/public/icons/tg.svg";
import VK from "/public/icons/vk.svg";
import DC from "/public/icons/dc.svg";

export interface ISocialListItem {
  link: string;
  type: string;
}

type SocialListType = {
  items: ISocialListItem[];
};

export const SocialList: FC<SocialListType> = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li className={styles.list__item} key={index}>
          <Link className={styles.list__link} href={item.link}>
            {item.type === "telegram" ? (
              <TG />
            ) : item.type === "vk" ? (
              <VK />
            ) : item.type === "discord" ? (
              <DC />
            ) : (
              ""
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};
