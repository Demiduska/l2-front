import { FC } from "react";
import { ServersType } from "../../utils/api/types";
import { ServerCard } from "../card/ServerCard";
import { CardHead } from "../card/CardHead";

import styles from "./Servers.module.scss";

export const Servers: FC<ServersType> = ({ title, items, withIcons }) => {
  return (
    <div className={styles.servers}>
      <CardHead title={title} withIcons={withIcons} />
      <div className={styles.servers__list}>
        {items.map((item, index) => (
          <ServerCard
            key={item.id}
            id={item.id}
            name={item.name}
            server_type={item.server_type}
            serverTags={item.serverTags}
            open_date={item.open_date}
            rates={item.rates}
            chronic={item.chronic}
            link={item.link}
            bonus_for_newbies_text={item.bonus_for_newbies_text}
            promotion_bonus_text={item.promotion_bonus_text}
            cash_reward_text={item.cash_reward_text}
          />
        ))}
      </div>
    </div>
  );
};
