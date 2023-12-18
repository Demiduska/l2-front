import { ServerResponseType, ServerStatusType } from "../../utils/api/types";
import { FC } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Status } from "../status/Status";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { endpoints } from "../../utils/constants";
import { ServiceCard } from "./ServiceCard";

import Edit from "../../public/icons/profile/edit.svg";
import styles from "./ServerProfileCard.module.scss";

export const ServerProfileCard: FC<ServerResponseType> = ({
  id,
  name,
  status,
  views,
  orders,
}) => {
  const [width, height] = useWindowSize();

  const ordersItems =
    orders && orders[0]?.orderItems
      ? [...orders[0].orderItems].sort((a, b) =>
          b.serviceType.localeCompare(a.serviceType)
        )
      : null;

  return (
    <div className={styles.card}>
      <div className={styles.card__head}>
        <div className={styles.card__head_title}>
          <h3 className={"h1"}>{name}</h3>
          <Link href={"/profile/edit-server/" + id}>
            <Edit />
            {width <= endpoints.sm && "Редактировать"}
          </Link>

          <Status
            className={styles.card__head_status}
            type={"server"}
            status={status}
          />
        </div>
        {width > endpoints.sm && (
          <button
            className={classNames(
              "btn btn--transparent",
              styles.card__head_button
            )}
          >
            Добавить услугу
          </button>
        )}
      </div>
      {ordersItems && (
        <div className={styles.card__body}>
          <div className={styles.card__body_title}>подключенные услуги</div>
          <div className={styles.card__services}>
            {ordersItems.map((item) => (
              <ServiceCard
                key={item.id}
                id={item.id}
                orderId={item.orderId}
                unitPrice={item.unitPrice}
                days={item.days}
                start_date={item.start_date}
                end_date={item.end_date}
                status={item.status}
                serviceId={item.serviceId}
                serviceGroup={item.serviceGroup}
                serviceType={item.serviceType}
              />
            ))}
          </div>
          {width <= endpoints.sm && (
            <div className={"w-full mt-18 d-flex justify-center"}>
              <button
                className={classNames(
                  "btn btn--transparent",
                  styles.card__head_button
                )}
              >
                Добавить услугу
              </button>
            </div>
          )}
        </div>
      )}

      <div className={styles.card__footer}>
        <div className={styles.card__footer_item}>
          <div className={styles.card__footer_digit}>0</div>
          <div className={styles.card__footer_title}>Переходы за сегодня</div>
        </div>
        <div className={styles.card__footer_item}>
          <div className={styles.card__footer_digit}>0</div>
          <div className={styles.card__footer_title}>Переходы за неделю</div>
        </div>
        <div className={styles.card__footer_item}>
          <div className={styles.card__footer_digit}>0</div>
          <div className={styles.card__footer_title}>Переходы за месяц</div>
        </div>
        <div className={styles.card__footer_item}>
          <div className={styles.card__footer_digit}>0</div>
          <div className={styles.card__footer_title}>Переходы за все время</div>
        </div>
      </div>
    </div>
  );
};
