import React from "react";
import classNames from "classnames";

import styles from "./HeroForm.module.scss";
import back from "../../public/images/back1.png";
import Logo from "../../public/images/logo.svg";
import Link from "next/link";

export default function HeroForm({ children }: { children: React.ReactNode }) {
  return (
    <section className={classNames(styles.hero, "hero__form")}>
      <style jsx>{`
        .hero__form {
          background-image: url(${back.src});
        }
      `}</style>
      <Link href={"/"}>
        <Logo />
      </Link>
      {children}
    </section>
  );
}
