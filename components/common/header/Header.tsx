import React, { FC, useEffect, useState } from "react";
import { Container } from "../container/container";
import classNames from "classnames";
import Link from "next/link";
import { SearchHeader } from "../../search/search-header";
import ThemeChanger from "../../theme-changer/theme-changer";
import { ButtonLogin } from "../../button/ButtonLogin";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";
import { usePathname } from "next/navigation";
import Hamburger from "hamburger-react";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import { endpoints } from "../../../utils/constants";

import styles from "./Header.module.scss";
import Logo from "../../../public/images/logo.svg";
import Rus from "../../../public/icons/countries-rus.svg";
import Login from "../../../public/icons/login.svg";
import { MobileMenuWrap } from "../../menu/MobileMenuWrap";
import { IMenuItem } from "../../menu/menu";
import { ISocialListItem } from "../../social-list/SocialList";
import { ProfileIcon } from "../../profile/profile-icon/profile-icon";

type HeaderType = {
  menu: IMenuItem[];
  list: ISocialListItem[];
};

export const Header: FC<HeaderType> = ({ menu, list }) => {
  const userData = useAppSelector(selectUserData);
  const pathname = usePathname();
  const [width, height] = useWindowSize();
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.getElementById("body")?.classList.add("hidden");
    } else {
      document.getElementById("body")?.classList.remove("hidden");
    }
    return () => {
      document.getElementById("body")?.classList.remove("hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <Container>
        <div className={classNames(styles.header__wrap)}>
          {width <= endpoints.oxl && (
            <div className={styles.header__hamburger}>
              <Hamburger
                direction="left"
                toggled={isOpen}
                toggle={setOpen}
                size={20}
                color="#ffffff"
              />
            </div>
          )}
          {width <= endpoints.oxl && (
            <MobileMenuWrap menu={menu} isOpen={isOpen} list={list} />
          )}
          <Link href={"/"} className={styles.header__image}>
            <Logo />
          </Link>
          {width > endpoints.oxl && (
            <>
              <ul className={styles.header__menu}>
                <li className={styles.header__menu_item}>
                  <Link
                    className={classNames(
                      styles.header__menu_link,
                      pathname === "/" && "active"
                    )}
                    href={"/"}
                  >
                    серверы
                  </Link>
                </li>
                <li className={styles.header__menu_item}>
                  <Link
                    className={classNames(
                      styles.header__menu_link,
                      pathname === "/base" && "active"
                    )}
                    href={"/base"}
                  >
                    база знаний
                  </Link>
                </li>
              </ul>
              <SearchHeader
                className={styles.header__search}
                placeholder={"Поиск сервера по ключевым словам"}
              />
              <Link href={"/advertising"}>Реклама на сайте</Link>
              {userData ? (
                <Link
                  className={classNames("btn text-400 btn--br-60")}
                  href={"/add-server"}
                >
                  Добавить сервер
                </Link>
              ) : (
                <ButtonLogin
                  className={"btn text-400 btn--br-60"}
                  text={"Добавить сервер"}
                />
              )}
            </>
          )}

          {userData ? (
            <Link className={"profile-link active"} href={"/profile"}>
              <ProfileIcon />
            </Link>
          ) : (
            <ButtonLogin />
          )}

          <button className="change-country__btn">
            <Rus />
          </button>
          {width > endpoints.oxl && <ThemeChanger />}
        </div>
      </Container>
    </header>
  );
};
