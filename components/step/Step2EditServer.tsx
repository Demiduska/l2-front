import React, { FC, useEffect } from "react";
import { CardHead } from "../card/CardHead";
import classNames from "classnames";
import { ServerCard } from "../card/ServerCard";
import { RadioStatusButton } from "../inputs/radio-button/RadioStatusButton";
import { ServiceCheckbox } from "../inputs/checkbox/ServiceCheckbox";
import { SelectTextOptionType } from "../inputs/select/SelectText";
import {
  CreateServerDto,
  PackageItemType,
  ResponseServices,
  ServerStatusType,
  ServerTagType,
} from "../../utils/api/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectEditServerData,
  selectOpenDate,
  selectServerServices,
  selectTotalAmount,
  setBanners,
  setEditServerData,
  setServerType,
} from "../../redux/slices/server";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateServerFormSchema } from "../../utils/validators";
import { useRouter } from "next/router";
import { Api } from "../../utils/api";

import styles from "./Step.module.scss";
import useSWR, { Fetcher } from "swr";
import { setUserData } from "../../redux/slices/user";
import { setFormType } from "../../redux/slices/common";

type Step2Type = {
  chronics: SelectTextOptionType[];
  serverTags: ServerTagType[];
  setStep: (step: number) => void;
};

const fetcher: Fetcher<ResponseServices, string> = (date) =>
  Api().service.getServices(date);

export const Step2EditServer: FC<Step2Type> = ({
  chronics,
  serverTags,
  setStep,
}) => {
  const openDate = useAppSelector(selectOpenDate);
  const {
    data,
    error: errorPackages,
    isLoading: isLoadingPackages,
  } = useSWR({ openDate: openDate }, fetcher);

  const packages: PackageItemType[] | undefined = data?.packages;
  const packagesBanner: PackageItemType[] | undefined = data?.banners;

  const defaultServerData = useAppSelector(selectEditServerData);
  const orderItems = useAppSelector(selectServerServices);
  const totalAmount = useAppSelector(selectTotalAmount);

  const dispatch = useAppDispatch();
  const router = useRouter();
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

  const serverDemo = useWatch({ control });

  useEffect(() => {
    if (serverDemo?.server_type)
      dispatch(setServerType(ServerStatusType[serverDemo.server_type]));
  }, [serverDemo.server_type]);

  useEffect(() => {
    if (serverDemo?.banners) {
      dispatch(setBanners(serverDemo.banners));
    }
  }, [serverDemo.banners]);

  const onSubmit = async (dto: CreateServerDto) => {
    dispatch(setEditServerData(dto));
    try {
      const orders = {
        ...dto,
        totalAmount,
        orderItems: orderItems.filter((item) => item.id !== 0),
      };
      /*
      @TODO 1) Check if user not authorized  2) Delete server_type 3) Check list of orders
       */
      // const user = await Api().user.getMe();
      // console.log(user);
      const data = await Api().server.update(orders);
      await router.push("/server-moderation");
      console.log(data);
    } catch (e: any) {
      console.log(e);
      if (e.response.status === 401) {
        dispatch(setUserData(null));
        dispatch(setFormType("login"));
      }
    }
  };

  return (
    <div className={styles.step}>
      <h2 className={classNames(styles.step__title, styles.step__title_step2)}>
        Статус сервера
      </h2>
      <form
        id={"step2"}
        className={styles.step__info}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {packages &&
            packages.map((item, index) => (
              <RadioStatusButton<CreateServerDto>
                key={item[index].id}
                id={item[index].id}
                title={item[index].title}
                name={"server_type"}
                value={item[index].group}
                register={register}
                available={item[index].available}
                content={item[index].content}
                package_items={Object.values(item)}
                orders={defaultServerData?.orders}
              />
            ))}
          <RadioStatusButton<CreateServerDto>
            id={0}
            key={0}
            title={"без статуса"}
            name={"server_type"}
            value={ServerStatusType.default}
            register={register}
            package_items={[]}
          />
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
      <div className={styles.step__additional}>
        <h2
          className={classNames(styles.step__title, styles.step__title_step2)}
        >
          Дополнительные услуги
        </h2>
        <div className={styles.step__additional_list}>
          {packagesBanner &&
            packagesBanner.map((item, index) => (
              <ServiceCheckbox<CreateServerDto>
                id={item[index].id}
                key={item[index].id}
                title={item[index].title}
                name={"banners"}
                value={item[index].group}
                register={register}
                available={item[index].available}
                content={item[index].content}
                package_items={Object.values(item)}
                orders={defaultServerData?.orders}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
