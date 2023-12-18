import { FC, useState } from "react";

import styles from "./Checkbox.module.scss";
import Checkmark from "../../../public/icons/checkmark.svg";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type CheckboxType<TFormValues extends FieldValues> = {
  title: string;
  value: string;
  disabled?: boolean;
  checked?: boolean;
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<FieldValues, FieldError>>;
};

export const Checkbox = <TFormValues extends Record<string, unknown>>({
  title,
  name,
  value,
  register,
  disabled,
  checked,
  errors,
}: CheckboxType<TFormValues>) => {
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        value={value}
        name={name}
        disabled={disabled && !checked}
        id={value}
        {...(register && register(name))}
      />
      <label htmlFor={value}>
        {title}
        <span>
          <Checkmark />
        </span>
      </label>
    </div>
  );
};
