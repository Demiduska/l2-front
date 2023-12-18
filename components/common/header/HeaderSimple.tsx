import { FC } from "react";
import classNames from "classnames";
import Link from "next/link";

import styles from "./HeaderSimple.module.scss";
import Logo from "../../../public/images/logo.svg";

export const HeaderSimple: FC = () => {
  return (
    <header className={classNames(styles.header, "d-flex justify-center")}>
      <Link href={"/"}>
        <Logo />
      </Link>
    </header>
  );
};
