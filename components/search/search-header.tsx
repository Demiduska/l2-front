import { FC } from "react";
import classNames from "classnames";

import Search from "/public/icons/search.svg";
import styles from "./SearchHeader.module.scss";

type SearchHeaderType = {
  className?: string;
  placeholder: string;
};

export const SearchHeader: FC<SearchHeaderType> = ({
  className,
  placeholder,
}) => {
  return (
    <form className={classNames(className)}>
      <label className={styles.form__label} htmlFor="search">
        <div className={styles.form__input_icon}>
          <Search />
        </div>

        <input
          className={styles.form__input}
          type="text"
          placeholder={placeholder}
          id="search"
        />
      </label>
    </form>
  );
};
