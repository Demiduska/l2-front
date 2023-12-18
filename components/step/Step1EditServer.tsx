import React, { FC } from "react";
import { CardHead } from "../card/CardHead";
import classNames from "classnames";
import { DateTimePicker } from "../date-time-picker/DateTimePicker";
import { InputText } from "../inputs/input/InputText";
import { Checkbox } from "../inputs/checkbox/Checkbox";
import { Textarea } from "../inputs/textarea/Textarea";
import { ServerCard } from "../card/ServerCard";
import { SelectText, SelectTextOptionType } from "../inputs/select/SelectText";
import { useForm, useWatch } from "react-hook-form";
import {
  CreateServerDto,
  ServerStatusType,
  ServerTagType,
} from "../../utils/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateServerFormSchema,
  UpdateServerFormSchema,
} from "../../utils/validators";

import styles from "./Step.module.scss";
import {
  selectEditServerData,
  setEditServerData,
} from "../../redux/slices/server";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";

type Step1Type = {
  chronics: SelectTextOptionType[];
  serverTags: ServerTagType[];
  setStep: (step: number) => void;
};

export const Step1EditServer: FC<Step1Type> = ({
  chronics,
  serverTags,
  setStep,
}) => {
  const dispatch = useAppDispatch();
  const defaultServerData = useAppSelector(selectEditServerData);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateServerDto>({
    mode: "onChange",
    defaultValues: defaultServerData ? defaultServerData : {},
    resolver: yupResolver(UpdateServerFormSchema),
  });

  const onSubmit = async (dto: CreateServerDto) => {
    const serverData = {
      ...dto,
      open_date: dto.open_date
        ? new Date(dto.open_date).toISOString()
        : new Date().toISOString(),
    };
    dispatch(setEditServerData(serverData));
    setStep(2);
  };

  const serverDemo = useWatch({ control });

  return (
    <div className={styles.step}>
      <h2 className={styles.step__title}>Информация о сервере</h2>
      <form
        className={styles.step__info}
        onSubmit={handleSubmit(onSubmit)}
        id={"step1"}
      >
        <div>
          <CardHead
            className={styles.step__info_head}
            title={"основная информация"}
          />
          <InputText<CreateServerDto>
            title={"Название сервера"}
            name={"name"}
            placeholder={"Server Name"}
            register={register}
            errors={errors}
            disabled={true}
          />
          <InputText<CreateServerDto>
            title={"Адрес сайта"}
            name={"link"}
            placeholder={"https://servername.ru"}
            register={register}
            errors={errors}
            disabled={true}
          />
          <InputText<CreateServerDto>
            title={"Рейты"}
            name={"rates"}
            placeholder={"Например, x100"}
            register={register}
            errors={errors}
            disabled={true}
          />
          <SelectText<CreateServerDto>
            title={"Хроники"}
            name={"chronic"}
            register={register}
            errors={errors}
            options={chronics}
          />
        </div>
        <div>
          <CardHead
            className={styles.step__info_head}
            title={"дата открытия"}
          />
          <DateTimePicker<CreateServerDto>
            className={"mt-12"}
            name={"open_date"}
            register={register}
            errors={errors}
            setValue={setValue}
            disabled={true}
          />
        </div>
        <div>
          <CardHead
            className={styles.step__info_head}
            title={"особенности сервера"}
          />
          <div className={"mt-sm-12 mt-24"}>
            Выберите не более 3-х тэгов для сервера
          </div>
          <div className={classNames(styles.step__info_spec)}>
            {serverTags.map((item, id) => (
              <Checkbox<CreateServerDto>
                disabled={
                  serverDemo?.serverTags && serverDemo?.serverTags.length >= 3
                }
                title={item.name}
                value={item.slug}
                name={"serverTags"}
                key={item.slug}
                register={register}
                checked={
                  serverDemo?.serverTags
                    ? serverDemo?.serverTags?.includes(item.slug)
                    : false
                }
              />
            ))}
          </div>
          {errors?.["serverTags"]?.message && (
            <div
              className={classNames(
                "text-red",
                "text-error",
                "mt-12",
                styles.label__error
              )}
            >
              {errors?.["serverTags"]?.message}
            </div>
          )}
          <div className={classNames(styles.step__info_more)}>
            {serverDemo.serverTags &&
              serverDemo?.serverTags?.includes("cash-reward") && (
                <Textarea<CreateServerDto>
                  title={"Денежная награда"}
                  name={"cash_reward_text"}
                  register={register}
                  placeholder={
                    "Напишите подробнее, каждый пункт с новой строки"
                  }
                />
              )}
            {serverDemo.serverTags &&
              serverDemo?.serverTags?.includes("promotion-bonus") && (
                <Textarea<CreateServerDto>
                  title={"Бонус за продвижение"}
                  name={"promotion_bonus_text"}
                  register={register}
                  placeholder={
                    "Напишите подробнее, каждый пункт с новой строки"
                  }
                />
              )}
            {serverDemo.serverTags &&
              serverDemo?.serverTags?.includes("bonus-for-newbies") && (
                <Textarea<CreateServerDto>
                  title={"Бонус новичкам"}
                  name={"bonus_for_newbies_text"}
                  register={register}
                  placeholder={
                    "Напишите подробнее, каждый пункт с новой строки"
                  }
                />
              )}
          </div>
        </div>
        <div>
          <CardHead className={styles.step__info_head} title={"демонстрация"} />
          <ServerCard
            id={1}
            name={serverDemo.name}
            server_type={
              serverDemo.server_type
                ? serverDemo.server_type
                : ServerStatusType.default
            }
            serverTags={
              serverDemo?.serverTags
                ? serverTags.filter((tag) =>
                    serverDemo?.serverTags?.includes(tag.slug)
                  )
                : undefined
            }
            open_date={serverDemo.open_date}
            rates={serverDemo.rates}
            chronic={
              chronics?.filter((item) => item.value === serverDemo.chronic)[0]
            }
            link={serverDemo.link}
            promotion_bonus_text={serverDemo.promotion_bonus_text}
            bonus_for_newbies_text={serverDemo.bonus_for_newbies_text}
            cash_reward_text={serverDemo.cash_reward_text}
          />
        </div>
      </form>
    </div>
  );
};
