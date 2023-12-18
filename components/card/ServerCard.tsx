import { FC } from "react";
import { ServerResponseType, ServerType } from "../../utils/api/types";
import classNames from "classnames";
import Link from "next/link";
import { Tag } from "../tag/Tag";

import styles from "./ServerCard.module.scss";
import SuperVip from "../../public/icons/server/super_vip_white.svg";
import Vip from "../../public/icons/server/vip.svg";
import Default from "../../public/icons/server/no_status.svg";
import New from "../../public/icons/server/new.svg";
import Pts from "../../public/icons/server/pts.svg";

export const ServerCard: FC<ServerResponseType | ServerType> = ({
  id,
  name,
  server_type,
  serverTags,
  open_date,
  rates,
  chronic,
  link,
  cash_reward_text,
  bonus_for_newbies_text,
  promotion_bonus_text,
}) => {
  const newTag = serverTags?.filter((tag) => tag.slug === "bonus-for-newbies");
  const ptsTag = serverTags?.filter((tag) => tag.slug === "pts");
  const customTag = serverTags?.filter((tag) => tag.slug === "custom");
  const rvrTag = serverTags?.filter((tag) => tag.slug === "rvr");
  const gveTag = serverTags?.filter((tag) => tag.slug === "gve");
  const iconTags = serverTags?.filter((tag) => {
    return !(
      tag.slug === "bonus-for-newbies" ||
      tag.slug === "pts" ||
      tag.slug === "custom" ||
      tag.slug === "rvr" ||
      tag.slug === "gve"
    );
  });

  return (
    <Link
      href={link ? link : "/add-servers"}
      className={classNames(styles.card, server_type)}
    >
      <div className={classNames(styles.card__icon)}>
        {server_type === "super_vip" && <SuperVip />}
        {server_type === "vip" && <Vip />}
        {server_type === "default" && <Default />}
      </div>
      <h3 className={styles.card__title}>
        {name ? name : "Server Name"}
        {((newTag && newTag.length > 0) || (ptsTag && ptsTag.length > 0)) && (
          <span className={classNames(styles.card__sticker)}>
            {newTag && newTag.length > 0 && <New />}
            {ptsTag && ptsTag.length > 0 && <Pts />}
          </span>
        )}
      </h3>
      <div className={styles.card__tags}>
        {iconTags && iconTags.length > 0 ? (
          iconTags.map((item, index) => (
            <Tag
              className={styles.card__tags_item}
              key={index}
              content={item.content ? item.content : ""}
              name={item.name}
              value={item.slug}
            />
          ))
        ) : (
          <div className={styles.card__tags_item} />
        )}
      </div>
      <div className={styles.card__rate}>
        {gveTag && gveTag.length > 0 ? (
          <Tag
            className={styles.card__custom}
            content={gveTag[0].content ? gveTag[0].content : ""}
            name={gveTag[0].name}
            value={gveTag[0].slug}
          />
        ) : rvrTag && rvrTag.length > 0 ? (
          <Tag
            className={styles.card__custom}
            content={rvrTag[0].content ? rvrTag[0].content : ""}
            name={rvrTag[0].name}
            value={rvrTag[0].slug}
          />
        ) : (
          "x" + rates
        )}
      </div>
      <div className={styles.card__chronic}>{chronic && chronic.name}</div>
      {customTag && customTag.length > 0 && (
        <Tag
          className={styles.card__custom}
          content={customTag[0].content ? customTag[0].content : ""}
          name={customTag[0].name}
          value={customTag[0].slug}
        />
      )}
      <div className={styles.card__date}>
        {open_date && new Date(open_date).toLocaleDateString("ru-RU")}
      </div>
    </Link>
  );
};
