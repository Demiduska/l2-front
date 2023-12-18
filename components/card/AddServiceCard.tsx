import React, { FC } from "react";
import {
  PackageItemType,
  SelectServiceType,
  ServiceType,
} from "../../utils/api/types";
import classNames from "classnames";
import { Available } from "../available/Available";
import { ApplyDate } from "../apply-date/apply-date";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";

import styles from "./AddServiceCard.module.scss";
import Super_vip from "../../public/icons/server/super_vip_white.svg";
import Vip from "../../public/icons/server/vip.svg";
import { Fetcher } from "swr";
import { Api } from "../../utils/api";

const fetcher: Fetcher<ServiceType | null, SelectServiceType> = (dto) =>
  dto.id ? Api().service.getService(dto) : null;

export const AddServiceCard: FC<PackageItemType> = ({
  available,
  days,
  group,
  id,
  unitPrice,
  maxCount,
  start_date,
  end_date,
  title,
  type,
  content,
  serverId,
}) => {
  const userData = useAppSelector(selectUserData);
  const currentServer = userData?.servers?.find(
    (server) => server.id === serverId
  );

  /*
    @TODO write start date for every services when orders > 1 and write it in the backend and find last end_date of order
   */

  return (
    <form className={styles.card}>
      <div className={styles.card__head}>
        <div className={styles.card__head_title}>
          {(group === "super_vip" || group === "vip") && (
            <div
              className={classNames(
                styles.card__head_icon,
                group === "super_vip" && styles.card__head_icon_super_vip,
                group === "vip" && styles.card__head_icon_vip
              )}
            >
              {group === "super_vip" && <Super_vip />}
              {group === "vip" && <Vip />}
            </div>
          )}
          <h2>{title}</h2>
        </div>
        <div className={styles.card__head_available}>
          <Available className={"mr-12"} count={available} />
          <ApplyDate date={new Date(start_date)} />
        </div>
        <div className={styles.card__head_content}>{content}</div>
      </div>
    </form>
  );
};
