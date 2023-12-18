import { FC } from "react";
import classNames from "classnames";

import styles from "./Pagination.module.scss";
import Chevron from "../../public/icons/chevron.svg";
import ChevronDouble from "../../public/icons/chevron-double.svg";

export const Pagination: FC = () => {
  return (
    <div className={styles.pagination}>
      <button
        className={classNames(
          styles.pagination__button,
          styles.pagination__button_first,
          styles.pagination__button_disabled
        )}
      >
        <ChevronDouble />
      </button>
      <button
        className={classNames(
          styles.pagination__button,
          styles.pagination__button_prev,
          styles.pagination__button_disabled
        )}
      >
        <Chevron />
      </button>
      <button
        className={classNames(
          styles.pagination__button,
          styles.pagination__button_active
        )}
      >
        1
      </button>
      <button className={classNames(styles.pagination__button)}>2</button>
      <button className={classNames(styles.pagination__button)}>3</button>
      <button className={classNames(styles.pagination__button)}>...</button>
      <button className={classNames(styles.pagination__button)}>26</button>
      <button className={classNames(styles.pagination__button)}>
        <Chevron />
      </button>
      <button className={classNames(styles.pagination__button)}>
        <ChevronDouble />
      </button>
    </div>
  );
};
