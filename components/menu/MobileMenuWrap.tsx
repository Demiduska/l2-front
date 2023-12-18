import React, { FC, useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useWindowSize } from "../../utils/hooks/useWindowSize";

import styles from "./MobileMenuWrap.module.scss";
import { IMenuItem, Menu } from "./menu";
import { SearchHeader } from "../search/search-header";
import classNames from "classnames";
import { ISocialListItem, SocialList } from "../social-list/SocialList";
import ThemeChanger from "../theme-changer/theme-changer";

const menuVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 0px 0px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 0px 0px)",
    transition: {
      // delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

type MobileMenuWrapType = {
  isOpen: boolean;
  menu: IMenuItem[];
  list: ISocialListItem[];
};

const variants = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "spring",
    },
  },
  closed: {
    opacity: 0,
  },
};

export const MobileMenuWrap: FC<MobileMenuWrapType> = ({
  menu,
  isOpen,
  list,
}) => {
  const [width, height] = useWindowSize();

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={classNames(styles.menu__wrap, isOpen && "active")}
    >
      <motion.div className={styles.menu__background} variants={menuVariants} />
      <motion.div variants={variants}>
        <SearchHeader
          className={styles.menu__search}
          placeholder={"Поиск сервера по ключевым словам"}
        />
        <nav className={styles.menu__nav}>
          <Menu items={menu} />
        </nav>
        <SocialList items={list} />
        <div className={styles.menu__changer}>
          <ThemeChanger />
        </div>
      </motion.div>
    </motion.div>
  );
};
