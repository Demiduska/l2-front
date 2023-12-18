import React from "react";
import classNames from "classnames";

import styles from "./Sidebar.module.scss";

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Sidebar({ children, className }: LayoutProps) {
  return (
    <div className={classNames(className && className, styles.sidebar)}>
      {children}
    </div>
  );
}
