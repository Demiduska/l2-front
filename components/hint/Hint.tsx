import { FC } from "react";
import classNames from "classnames";

import styles from "./Hint.module.scss";

type HintType = {
  content: string;
  className?: string;
};

export const Hint: FC<HintType> = ({ content, className }) => {
  return (
    <span className={classNames(styles.hint, className, "hint")}>
      {content}
    </span>
  );
};
