import { FC } from "react";

import styles from "./Textarea.module.scss";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type TextareaType<TFormValues extends FieldValues> = {
  title: string;
  name: Path<TFormValues>;
  placeholder: string;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<FieldValues, FieldError>>;
};

export const Textarea = <TFormValues extends Record<string, unknown>>({
  title,
  name,
  placeholder,
  register,
  errors,
}: TextareaType<TFormValues>) => {
  return (
    <label className={styles.textarea} htmlFor={name}>
      {title}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        {...(register && register(name))}
      />
    </label>
  );
};
