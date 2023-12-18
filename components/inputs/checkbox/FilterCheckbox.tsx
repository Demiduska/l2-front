import { FC } from "react";
import { FilterItemType } from "../../../utils/api/types";

import styles from "./FilterCheckbox.module.scss";
import classNames from "classnames";

export const FilterCheckbox: FC<FilterItemType> = ({
  title,
  count,
  value,
  name,
}) => {
  return (
    <div className={styles.checkbox}>
      <input
        name={name}
        id={title + value.toString()}
        type={"checkbox"}
        value={value}
      />
      <label
        className={classNames(
          styles.checkbox__label,
          count ? "justify-space-between" : "justify-center"
        )}
        htmlFor={title + value.toString()}
      >
        {title}
        {count && <span className={styles.checkbox__count}>{count}</span>}
      </label>
    </div>
  );
};
