import React, { FC, useState } from "react";
import classNames from "classnames";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import styles from "./InputText.module.scss";
import Eye from "../../../public/icons/eye.svg";

type InputTextType<TFormValues extends FieldValues> = {
  password?: boolean;
  title: string;
  name: Path<TFormValues>;
  placeholder: string;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<FieldValues, FieldError>>;
  disabled?: boolean;
};

export const InputText = <TFormValues extends Record<string, unknown>>({
  password,
  title,
  name,
  placeholder,
  register,
  errors,
  disabled,
}: InputTextType<TFormValues>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickOnShowPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label className={classNames(styles.label)}>
        {title}
        <input
          className={classNames("input", {
            "input--error": errors?.[name],
          })}
          name={name}
          type={password ? (showPassword ? "text" : "password") : "text"}
          placeholder={placeholder}
          {...(register && register(name))}
          disabled={disabled}
        />
        {password && (
          <a
            className={classNames(styles.label__show, showPassword && "active")}
            onClick={handleClickOnShowPassword}
          >
            <Eye />
          </a>
        )}
      </label>

      {errors?.[name]?.message && (
        <span
          className={classNames("text-red", "text-error", styles.label__error)}
        >
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};
