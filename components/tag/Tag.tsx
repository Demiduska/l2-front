import { FC } from "react";
import classNames from "classnames";
import { Hint } from "../hint/Hint";
import styles from "./Tag.module.scss";

import Money from "../../public/icons/server/money_reward.svg";
import Obt from "../../public/icons/server/obt.svg";
import Bonus from "../../public/icons/server/start_bonus.svg";
import Worldwide from "../../public/icons/server/worldwide.svg";
import Custom from "../../public/icons/server/custom.svg";

type TagType = {
  className?: string;
  value: string;
  content: string;
  name: string;
  customContent?: string;
};

export const Tag: FC<TagType> = ({
  className,
  value,
  content,
  name,
  customContent,
}) => {
  return (
    <div className={classNames(className, styles.tag)}>
      {value === "cash-reward" ? (
        <Money />
      ) : value === "launch-obt" ? (
        <Obt />
      ) : value === "promotion-bonus" ? (
        <Bonus />
      ) : value === "international-server" ? (
        <Worldwide />
      ) : value === "custom" ? (
        <Custom />
      ) : (
        name
      )}
      <Hint content={content} />
    </div>
  );
};
