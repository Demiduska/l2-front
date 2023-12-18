import { FC } from "react";
import {
  BannerStatusType,
  ResponseOrderItemType,
  ServerStatusType,
} from "../../utils/api/types";
import { differenceInDays } from "date-fns";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { endpoints } from "../../utils/constants";
import { Status } from "../status/Status";
import { DaysRemain } from "../days-remain/days-remain";

import styles from "./ServiceCard.module.scss";

import Vip from "../../public/icons/server/vip.svg";
import SuperVip from "../../public/icons/server/super_vip.svg";
import ImageIcon from "../../public/images/image.svg";

export const ServiceCard: FC<ResponseOrderItemType> = ({
  id,
  status,
  end_date,
  serviceGroup,
  serviceType,
}) => {
  const [width, height] = useWindowSize();

  /*
          @TODO Make functions for difference between dates and display date
      */

  return (
    <div className={styles.card}>
      <div className={styles.card_info}>
        {serviceGroup === ServerStatusType.super_vip && <SuperVip />}
        {serviceGroup === ServerStatusType.vip && <Vip />}
        <div className={styles.card_title}>
          {serviceGroup === ServerStatusType.super_vip && "Super Vip"}
          {serviceGroup === ServerStatusType.vip && "Vip"}
          {serviceGroup === BannerStatusType.banner_1 && "Баннер"}
          {serviceGroup === BannerStatusType.banner_2 &&
            "Брендированная реклама"}
        </div>
        {width <= endpoints.sm && (
          <div className={styles.card_status}>
            <Status status={status} />
          </div>
        )}
        <div className={styles.card_date}>
          до{" "}
          {new Date(end_date).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
        {width > endpoints.sm && serviceType !== "server_type" && (
          <button className={styles.card__image}>
            <ImageIcon />
          </button>
        )}
        <DaysRemain days={differenceInDays(new Date(end_date), new Date())} />
        {width <= endpoints.sm && serviceType !== "server_type" && (
          <div className={styles.card__image_wrap}>
            <button className={styles.card__image}>
              <ImageIcon />
            </button>
          </div>
        )}
      </div>
      {width > endpoints.sm && <Status status={status} />}
    </div>
  );
};
