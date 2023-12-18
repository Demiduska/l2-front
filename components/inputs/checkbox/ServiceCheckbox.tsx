import React, { FC, useEffect, useState } from "react";
import { Select } from "../select/Select";

import Checkmark from "../../../public/icons/checkmark.svg";
import Upload from "../../../public/icons/upload.svg";
import classNames from "classnames";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import {
  BannerStatusType,
  OrderItemType,
  OrderServiceType,
  PackageItemType,
  ResponseOrderType,
  SelectServiceType,
  ServerStatusType,
  ServiceType,
} from "../../../utils/api/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addBannerItem,
  removeBannerItem,
  selectBanners,
} from "../../../redux/slices/server";

import styles from "../radio-button/RadioStatusButton.module.scss";
import { addDays } from "../../../utils/helpers/addDays";
import useSWR, { Fetcher } from "swr";
import { Api } from "../../../utils/api";
import { convertToDateWithOptions } from "../../../utils/helpers/convertToDateWithOptions";
import { isToday } from "date-fns";
import { Available } from "../../available/Available";
import { ApplyDate } from "../../apply-date/apply-date";

type ServiceCheckboxType<TFormValues extends FieldValues> = {
  id: number;
  title: string;
  name: Path<TFormValues>;
  value: string;
  content?: string;
  available?: number;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<FieldValues, FieldError>>;
  package_items: PackageItemType[];
  orders?: ResponseOrderType[] | undefined;
};

const fetcher: Fetcher<ServiceType | null, SelectServiceType> = (dto) =>
  dto.id ? Api().service.getService(dto) : null;

export const ServiceCheckbox = <TFormValues extends Record<string, unknown>>({
  id,
  title,
  name,
  value,
  register,
  errors,
  available,
  content,
  package_items,
  orders,
}: ServiceCheckboxType<TFormValues>) => {
  const dispatch = useAppDispatch();
  const banners = useAppSelector(selectBanners);
  const [selectedDays, setSelectedDays] = useState<number>(15);
  const currentOrderItem =
    orders && orders[0]?.orderItems
      ? orders[0].orderItems.filter((order) => order.serviceGroup === value)
      : null;
  const [checked, setChecked] = useState<boolean>(
    !!(currentOrderItem && currentOrderItem.length > 0)
  );
  const [price, setPrice] = useState<number>(
    package_items && package_items.length > 0
      ? package_items.filter((item) => item.days === selectedDays)[0].unitPrice
      : 0
  );

  const {
    data: service,
    error: errorPackages,
    isLoading: isLoadingPackages,
  } = useSWR(
    {
      id: currentOrderItem?.length ? id : null,
      date:
        currentOrderItem && currentOrderItem?.length > 0
          ? currentOrderItem[0].end_date
          : null,
    },
    fetcher
  );

  /*
    @TODO Optimize start_date and end_date here and ServiceCheckbox component
   */

  const startDate: Date = service?.start_date
    ? new Date(service.start_date)
    : package_items && package_items.length > 0
    ? new Date(
        package_items.filter((item) => item.days === selectedDays)[0].start_date
      )
    : new Date();
  const endDate = service?.end_date
    ? new Date(addDays(startDate, selectedDays))
    : package_items &&
      package_items.length > 0 &&
      new Date(
        package_items.filter((item) => item.days === selectedDays)[0].end_date
      );

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const days = parseFloat(e.target.value);
    setSelectedDays(days);
    setPrice(package_items.filter((item) => item.days === days)[0].unitPrice);
    if (checked) {
      const order: OrderItemType = {
        id:
          package_items.length > 0
            ? package_items.filter((item) => item.days === days)[0].id
            : 0,
        title: title,
        order_service_type: value,
        days: days,
        price:
          package_items.length > 0
            ? package_items.filter((item) => item.days === days)[0].unitPrice
            : 0,
        start_date: startDate
          ? startDate.toISOString()
          : new Date().toISOString(),
        end_date: startDate
          ? addDays(startDate, days).toISOString()
          : new Date().toISOString(),
      };
      dispatch(addBannerItem(order));
    }
  };

  const handleClick = () => {
    setChecked((prevState) => !prevState);
  };

  useEffect(() => {
    if (checked) {
      const order: OrderItemType = {
        id:
          package_items.length > 0
            ? package_items.filter((item) => item.days === selectedDays)[0].id
            : 0,
        title: title,
        order_service_type: value,
        days: selectedDays,
        price:
          package_items.length > 0
            ? package_items.filter((item) => item.days === selectedDays)[0]
                .unitPrice
            : 0,
        start_date: startDate
          ? startDate.toISOString()
          : new Date().toISOString(),
        end_date: startDate
          ? addDays(startDate, selectedDays).toISOString()
          : new Date().toISOString(),
      };
      dispatch(addBannerItem(order));
    } else {
      dispatch(removeBannerItem(value));
    }
  }, [checked]);

  return (
    <div className={styles.status}>
      <input
        type="checkbox"
        value={value}
        name={name}
        id={value}
        defaultChecked={checked}
        onClick={handleClick}
        {...(register && register(name))}
      />
      <label htmlFor={value}>
        <div className={styles.status__head}>
          <div className={styles.status__head_type}>
            <div
              className={classNames(
                styles.status__head_type_circle,
                styles.status__head_type_circle_square
              )}
            >
              <span>
                <Checkmark />
              </span>
            </div>
            <h3 className={styles.status__head_type_title}>{title}</h3>
          </div>

          <Available count={available ? available : 0} />
        </div>

        <>
          <div className={styles.status__body}>
            <div className={styles.status__body_content}>{content}</div>
            {currentOrderItem && currentOrderItem.length > 0 && (
              <div className={styles.status__body_current}>
                Действует до{" "}
                {convertToDateWithOptions(currentOrderItem[0].end_date)}
              </div>
            )}
            <ApplyDate date={startDate} />
          </div>
          <div className={styles.status__footer}>
            <Select
              name={"days"}
              variants={package_items.map((item) => ({
                value: item.days,
                title: item.days + " дней",
              }))}
              onChange={onSelectChange}
            />
            <div className={styles.status__footer_time}>
              <div className={styles.status__footer_time__item}>
                <span>Начало:</span>{" "}
                {startDate &&
                  startDate.toLocaleDateString("ru-Ru", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
              </div>
              <div className={styles.status__footer_time__item}>
                <span>Завершение: </span>{" "}
                {endDate &&
                  endDate.toLocaleDateString("ru-Ru", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
              </div>
            </div>
            <div className={styles.status__footer_total}>
              <div className={styles.status__footer_total__days}>
                на {selectedDays} дней
              </div>
              <div className={styles.status__footer_total__amount}>
                {price} ₽
              </div>
            </div>
          </div>
          <div className={styles.status__upload}>
            <button
              className={classNames(
                "btn btn--black-light btn--br-60 btn--icon"
              )}
            >
              <Upload />
              Загрузить изображение
            </button>
          </div>
        </>
      </label>
    </div>
  );
};
