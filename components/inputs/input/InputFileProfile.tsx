import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  deleteAvatar,
  selectUserData,
  setUserData,
} from "../../../redux/slices/user";
import Image from "next/image";
import { generateFileUrl } from "../../../utils/helpers/generateFileUrl";

import styles from "./InputText.module.scss";
import { Api } from "../../../utils/api";
import { ProfileIcon } from "../../profile/profile-icon/profile-icon";

type InputTextType<TFormValues extends FieldValues> = {
  title: string;
  name: Path<TFormValues>;
  placeholder: string;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<FieldValues, FieldError>>;
  disabled?: boolean;
};

export const InputFileProfile = <TFormValues extends Record<string, unknown>>({
  title,
  name,
  placeholder,
  register,
  errors,
  disabled,
}: InputTextType<TFormValues>) => {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const [file, setFileName] = useState<string | null>(null);

  const onChangeInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setFileName(
      target?.files && target.files.length > 0 ? target.files[0].name : null
    );
  };

  const deleteFile = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (userData?.avatarId) {
      await Api().user.deleteAvatar(userData?.avatarId);
      dispatch(deleteAvatar());
    }

    dispatch(deleteAvatar());
  };

  return (
    <>
      <div className={classNames(styles.label)}>
        {title}
        <div className={styles.label__image_wrap}>
          <ProfileIcon />
          <div className={styles.input__fill}>
            <div className={styles.input__fill_content}>
              PG, GIF или PNG. Максимальный вес 700 кб.
              {file && <div>{file}</div>}
            </div>

            <div className={styles.input__buttons}>
              <label className="link--blue">
                <span className={classNames(styles.input__button)}>
                  Загрузить
                </span>
                <input
                  className={classNames("input-file", {
                    "input--error": errors?.[name],
                  })}
                  name={name}
                  type={"file"}
                  placeholder={placeholder}
                  {...(register && register(name))}
                  onChange={onChangeInput}
                  disabled={disabled}
                />
              </label>
              <a
                onClick={deleteFile}
                className={classNames(styles.input__button, "link--blue")}
              >
                Удалить
              </a>
            </div>
          </div>
        </div>
      </div>

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
