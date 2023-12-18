import { FC, ReactElement, ReactSVGElement } from "react";
import Link from "next/link";
import { StaticImageData } from "next/image";

import styles from "./Menu.module.scss";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export interface IMenuItem {
  title: string;
  mobileTitle?: string;
  link: string;
  icon?: ReactSVGElement | ReactElement | StaticImageData;
  mobileIcon?: ReactSVGElement | ReactElement | StaticImageData;
  count?: number;
}

export type MenuType = {
  items: IMenuItem[];
  position?: string;
};

export const Menu: FC<MenuType> = ({ items, position }) => {
  const pathname = usePathname();

  return (
    <ul className={styles.menu}>
      {items.map((item, index) => (
        <li className={styles.menu__item} key={index}>
          <Link
            className={classNames(
              styles.menu__link,
              pathname === item.link && position !== "footer" && "active"
            )}
            href={item.link}
          >
            <>
              {item.icon}
              <span>{item.title}</span>
            </>
          </Link>
        </li>
      ))}
    </ul>
  );
};
