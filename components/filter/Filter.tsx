import { FC, useState } from "react";
import { FilterType } from "../../utils/api/types";

import styles from "./Filter.module.scss";
import { FilterCheckbox } from "../inputs/checkbox/FilterCheckbox";
import classNames from "classnames";

export const Filter: FC<FilterType> = ({
  title,
  nameField,
  itemWidth,
  showAllText,
  items,
  showItems,
}) => {
  const [count, setCount] = useState<number>(
    showItems ? showItems : items.length
  );

  return (
    <div className={styles.filter}>
      <h3 className={styles.filter__title}>{title}</h3>
      <div
        className={classNames(
          styles.filter__item,
          itemWidth === 50 ? styles.filter__item_w_2 : styles.filter__item_w_1
        )}
      >
        {items.map(
          (item, index) =>
            index < count && (
              <FilterCheckbox
                key={index + item.value.toString()}
                title={item.title}
                value={item.value}
                name={nameField}
                count={item.count}
              />
            )
        )}
      </div>
      {showAllText && count === showItems && (
        <a
          className={classNames(styles.filter__button, "btn btn--black-light")}
          onClick={(e) => {
            e.preventDefault();
            setCount(items.length);
          }}
        >
          {showAllText}
        </a>
      )}
    </div>
  );
};
