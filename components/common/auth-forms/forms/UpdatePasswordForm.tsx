import React, { FC, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { FormType, UpdatePasswordDto } from "../../../../utils/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Api } from "../../../../utils/api";
import { setUserData } from "../../../../redux/slices/user";
import { isAxiosError } from "axios";
import { useAppDispatch } from "../../../../redux/hooks";
import { UpdatePasswordFormSchema } from "../../../../utils/validators";
import { InputText } from "../../../inputs/input/InputText";

import styles from "./LoginForm.module.scss";
import Spinner from "../../../../public/icons/spinner.svg";

export const UpdatePasswordForm: FC<FormType> = ({ type, setStep }) => {
  const [error, setError] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UpdatePasswordDto>({
    mode: "onChange",
    resolver: yupResolver(UpdatePasswordFormSchema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (dto: UpdatePasswordDto) => {
    try {
      setError("");
      const data = await Api().user.updatePassword(dto);
      dispatch(setUserData(data));
      reset();
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
            title={"Текущий пароль"}
            name={"password"}
            placeholder={"Текущий пароль"}
            register={register}
            errors={errors}
            password={true}
          />
          <InputText
            title={"Новый пароль"}
            name={"newPassword"}
            placeholder={"Новый пароль"}
            register={register}
            errors={errors}
            password={true}
          />
          <InputText
            title={"Повторите пароль"}
            name={"confirmPassword"}
            placeholder={"Повторите пароль"}
            register={register}
            errors={errors}
            password={true}
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
