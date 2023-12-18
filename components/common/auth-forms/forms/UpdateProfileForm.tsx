import React, { FC, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { FormType, UpdateUserDto } from "../../../../utils/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Api } from "../../../../utils/api";
import { selectUserData, setUserData } from "../../../../redux/slices/user";
import { isAxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { updateUserFormSchema } from "../../../../utils/validators";
import { InputText } from "../../../inputs/input/InputText";
import { InputFileProfile } from "../../../inputs/input/InputFileProfile";

import styles from "./LoginForm.module.scss";
import Spinner from "../../../../public/icons/spinner.svg";

export const UpdateProfileForm: FC<FormType> = ({ type, setStep }) => {
  const userData = useAppSelector(selectUserData);
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UpdateUserDto>({
    mode: "onChange",
    defaultValues: {
      nickName: userData?.nickName,
      email: userData?.email,
      telegram: userData?.telegram,
    },
    resolver: yupResolver(updateUserFormSchema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (dto: UpdateUserDto) => {
    try {
      setError("");
      const data = await Api().user.update(
        dto.file ? { ...dto, file: undefined } : dto
      );
      dispatch(setUserData(data));
      if (dto.file && dto.file.length > 0) {
        const userWithAvatar = await Api().user.uploadAvatar(dto.file);
        dispatch(setUserData(userWithAvatar));
      }
    } catch (err) {
      console.warn("Update error", err);
      setError("Smth wrong... Try again");
      if (isAxiosError(err) && err.response) {
        setError(err.response?.data.message);
      }
    }
  };

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputText
            title={"Никнейм"}
            name={"nickName"}
            placeholder={"Никнейм"}
            register={register}
            errors={errors}
          />
          <InputText
            title={"Email"}
            name={"email"}
            placeholder={"Email"}
            register={register}
            errors={errors}
          />
          <InputText
            title={"Telegram"}
            name={"telegram"}
            placeholder={"Telegram"}
            register={register}
            errors={errors}
          />
          <InputFileProfile
            title={"Аватар"}
            name={"file"}
            placeholder={"Upload"}
            register={register}
            errors={errors}
          />

          {error && (
            <div className="text-right d-block mt-24 text-red">{error}</div>
          )}
          <div
            className={classNames(
              styles.form__buttons,
              styles.form__buttons_edit
            )}
          >
            <button
              className={classNames(
                "btn",
                styles.form__edit,
                (!isValid || isSubmitting) && "btn--disabled"
              )}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Сохранить изменения"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
