import { FC } from "react";

import styles from "./StaticInfo.module.scss";
import Server from "../../public/icons/server.svg";
import Users from "../../public/icons/online.svg";

type StatisticInfoType = {
  type: string;
  count: number;
  title: string;
};

export const StatisticInfo: FC<StatisticInfoType> = ({
  type,
  title,
  count,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.item__icon}>
        {type === "server" ? <Server /> : <Users />}
      </div>
      <div className={styles.item__count}>{count}</div>
      <div className={styles.item__title}>{title}</div>
    </div>
  );
};
