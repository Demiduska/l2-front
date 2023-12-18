import { FC } from "react";

import styles from "./Available.module.scss";
import classNames from "classnames";

interface IAvailable {
  count: number;
  className?: string;
}

export const Available: FC<IAvailable> = ({ count, className }) => {
  return (
    <div className={classNames(className && className, styles.available)}>
      свободно: {count} мест.
    </div>
  );
};
