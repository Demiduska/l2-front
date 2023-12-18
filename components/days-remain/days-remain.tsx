import { FC } from "react";
import classNames from "classnames";

import styles from "./Days.module.scss";

type DaysRemainType = {
  days: number;
  className?: string;
};

export const DaysRemain: FC<DaysRemainType> = ({ days, className }) => {
  return (
    <span className={classNames(className && className, styles.days)}>
      {days} дн.
    </span>
  );
};
