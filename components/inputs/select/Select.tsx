import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Select.module.scss";

type VariantType = {
  title: string;
  value: number;
};

type SelectType = {
  title?: string;
  name: string;
  variants: VariantType[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: FC<SelectType> = ({ title, name, variants, onChange }) => {
  return (
    <label className={classNames(styles.select, "select-wrapper")}>
      {title && title}
      <select className={"select"} name={name} id={name} onChange={onChange}>
        {variants.map((item) => (
          <option key={name + item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </label>
  );
};
