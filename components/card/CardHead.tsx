import { FC } from "react";
import SuperVip from "../../public/icons/server/super_vip.svg";
import Vip from "../../public/icons/server/vip.svg";

import styles from "./CardHead.module.scss";
import classNames from "classnames";

type CardHeadType = {
  withIcons?: boolean;
  title: string;
  className?: string;
};

export const CardHead: FC<CardHeadType> = ({ withIcons, title, className }) => {
  return (
    <div className={classNames(styles.card__head, className && className)}>
      <h3 className={styles.card__head_title}>{title}</h3>
      {withIcons && (
        <div className={styles.card__head_icons}>
          <SuperVip />
          <Vip />
        </div>
      )}
    </div>
  );
};
