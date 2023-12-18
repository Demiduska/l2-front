import Head from "next/head";
import React from "react";
import CommonHead from "../head/common-head";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { IMenuItem } from "../../menu/menu";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ISocialListItem } from "../../social-list/SocialList";
import { ISocialListInItem } from "../../social-list/SocialListIn";
import { AuthForms } from "../auth-forms";

import Server from "/public/icons/server.svg";
import Question from "/public/icons/questions.svg";
import Adv from "/public/icons/adv.svg";
import Add from "/public/icons/add.svg";

type LayoutProps = {
  children: React.ReactNode;
  type: "full" | "empty";
};

const menu: IMenuItem[] = [
  {
    title: "серверы",
    link: "/",
    icon: <Server />,
  },
  {
    title: "база знаний",
    link: "/base",
    icon: <Question />,
  },
  {
    title: "реклама на сайте",
    link: "/advertising",
    icon: <Adv />,
  },
  {
    title: "Добавить сервер",
    link: "/add-server",
    icon: <Add />,
  },
];

const SOCIAL_LIST: ISocialListItem[] = [
  {
    type: "telegram",
    link: "/",
  },
  {
    type: "vk",
    link: "/",
  },
  {
    type: "discord",
    link: "/",
  },
];

const SOCIAL_LIST_IN: ISocialListInItem[] = [
  {
    type: "skype",
    link: "/",
    text: "l2srvcomsupport",
  },
  {
    type: "telegram",
    link: "/",
    text: "t.me/l2srv_collab",
  },
];

export default function Layout({ children, type }: LayoutProps) {
  return (
    <>
      <Head>
        <CommonHead />
      </Head>
      {type === "full" ? (
        <>
          <Header menu={menu} list={SOCIAL_LIST} />
          <main>{children}</main>
          <Footer menu={menu} list={SOCIAL_LIST} listIn={SOCIAL_LIST_IN} />
          <AuthForms />
        </>
      ) : (
        <GoogleReCaptchaProvider
          reCaptchaKey={"6Ler9ZgjAAAAAKhcu3C89WJQwvz_mx3UtwUXcHgF"}
          scriptProps={{
            async: false, // optional, default to false,
            defer: true, // optional, default to false
            appendTo: "body", // optional, default to "head", can be "head" or "body",
            nonce: undefined,
          }}
        >
          <main>{children}</main>
        </GoogleReCaptchaProvider>
      )}
    </>
  );
}
