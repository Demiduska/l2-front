import { FC } from "react";

import styles from "./Filters.module.scss";
import { FiltersType } from "../../utils/api/types";
import { Filter } from "../filter/Filter";

export const Filters: FC<FiltersType> = ({ filters }) => {
  return (
    <div className={styles.filters}>
      <form>
        {filters.map((item, index) => (
          <Filter
            key={index}
            title={item.title}
            nameField={item.nameField}
            itemWidth={item.itemWidth}
            showAllText={item.showAllText}
            items={item.items}
            showItems={item.showItems}
          />
        ))}
      </form>
    </div>
  );
};
