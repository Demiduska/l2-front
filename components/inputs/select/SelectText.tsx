import { FC } from "react";
import classNames from "classnames";
import styles from "./SelectText.module.scss";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type SelectTextOptionType = {
  name: string;
  value: string;
  id: number;
};

type SelectTextType<TFormValues extends FieldValues> = {
  title: string;
  name: Path<TFormValues>;
  options: SelectTextOptionType[];
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<FieldValues, FieldError>>;
};

export const SelectText = <TFormValues extends Record<string, unknown>>({
  title,
  name,
  options,
  register,
  errors,
}: SelectTextType<TFormValues>) => {
  return (
    <label className={classNames(styles.select, "select-wrapper")}>
      {title}
      <select
        className={"select"}
        name={name}
        {...(register && register(name))}
      >
        {options.map((item) => (
          <option key={item.value + name} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
};
