import React, { FC } from "react";
import { Container } from "../container/container";
import { IMenuItem, Menu } from "../../menu/menu";
import { ISocialListItem, SocialList } from "../../social-list/SocialList";
import ThemeChanger from "../../theme-changer/theme-changer";
import {
  ISocialListInItem,
  SocialListIn,
} from "../../social-list/SocialListIn";
import Image from "next/image";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import { endpoints } from "../../../utils/constants";

import Rus from "../../../public/icons/countries-rus.svg";
import styles from "./Footer.module.scss";
import Link from "next/link";
import Logo from "/public/images/logo.svg";
import { Payments } from "../../payments/Payments";
import { ButtonUp } from "../../button/ButtonUp";
import counter from "../../../public/images/liveinternet.png";

type FooterType = {
  menu: IMenuItem[];
  list: ISocialListItem[];
  listIn: ISocialListInItem[];
};

export const Footer: FC<FooterType> = ({ menu, list, listIn }) => {
  const year = new Date().getFullYear();
  const [width, height] = useWindowSize();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__head}>
        <Container>
          <div className={styles.footer__head_wrap}>
            <Link href={"/"}>
              <Logo />
            </Link>
            {width > endpoints.oxl && <Menu position={"footer"} items={menu} />}
            <SocialList items={list} />
          </div>
        </Container>
      </div>
      <Container>
        <div className={styles.footer__main}>
          <div className={styles.footer__main_changer}>
            <button className="change-country__btn">
              <Rus />
            </button>
            <ThemeChanger />
          </div>
          <div className={styles.footer__main_contacts}>
            <SocialListIn items={listIn} />
          </div>
          <div className={styles.footer__main_payments}>
            <Payments />
          </div>
          <div className={styles.footer__main_info}>
            <span className={"text-white-main"}>© {year} L2SRV.COM</span>
            <Link className={"d-block mt-5"} href={"/"}>
              Пользовательское соглашение
            </Link>
            <Link className={"d-block mt-5"} href={"/"}>
              Политика использования файлов cookie
            </Link>
          </div>
          <div className={styles.footer__main_copyright}>
            <span className={"d-block"}>
              Lineage II is a trademark of NCsoft Corporation.
            </span>
            <span className={"d-block mt-5"}>
              Copyright © NCsoft Corporation 2005-{year}. All rights reserved.
            </span>
          </div>
          <div className={styles.footer__main_up}>
            <ButtonUp />
            <Link className={"ml-sm-0 ml-24"} href={"/"}>
              <Image
                src={counter}
                alt={"counter"}
                title={"counter"}
                width={88}
                height={32}
              />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
