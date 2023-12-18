import { FC } from "react";
import { DiscountType } from "../../utils/api/types";
import classNames from "classnames";

import Bronze from "../../public/icons/bronze.svg";
import Silver from "../../public/icons/silver.svg";
import Gold from "../../public/icons/gold.svg";
import Line from "../../public/images/line.svg";
import styles from "./DiscountCard.module.scss";

export const DiscountCard: FC<DiscountType> = ({
  id,
  title,
  content,
  discount,
  max,
  min,
  level,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__head}>
        <div className={styles.card__head_info}>
          <div
            className={classNames(
              styles.card__head_icon,
              level === 1 && styles.card__head_icon_bronze,
              level === 2 && styles.card__head_icon_silver,
              level === 3 && styles.card__head_icon_gold
            )}
          >
            {level === 1 && <Bronze />}
            {level === 2 && <Silver />}
            {level === 3 && <Gold />}
          </div>
          <div className={styles.card__head_title}>
            <h2>{title}</h2>
            <span className={styles.card__head_title_content}>{content}</span>
          </div>
        </div>
        <div
          className={classNames(
            styles.card__head_discount,
            level === 1 && styles.card__head_discount_bronze,
            level === 2 && styles.card__head_discount_silver,
            level === 3 && styles.card__head_discount_gold
          )}
        >
          скидка {discount}%
        </div>
      </div>
      <div className={styles.card__bar}>
        <span className={styles.card__bar_line}>
          <span
            className={styles.card__bar_line_active}
            style={{ width: 70 + "%" }}
          >
            <Line />
          </span>
        </span>
        <div className={styles.card__bar_content}>
          <span>{min} ₽</span>
          <span>{max} ₽</span>
        </div>
      </div>
    </div>
  );
};
