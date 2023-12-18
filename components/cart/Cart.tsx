import React, { FC } from "react";
import classNames from "classnames";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { endpoints } from "../../utils/constants";
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";
import {
  selectServerServices,
  selectTotalAmount,
} from "../../redux/slices/server";
import Emoji from "../../public/icons/emoji.svg";
import SuperVip from "../../public/icons/server/super_vip.svg";
import Vip from "../../public/icons/server/vip.svg";
import styles from "./Cart.module.scss";

type CartType = {};

export const Cart: FC<CartType> = () => {
  const [width, height] = useWindowSize();
  const services = useAppSelector(selectServerServices);
  const totalAmount = useAppSelector(selectTotalAmount);
  console.log(services);

  return (
    <div className={styles.cart}>
      {width > endpoints.sm && (
        <h3 className={styles.cart__title}>корзина услуг</h3>
      )}
      {(services && services.length === 0) ||
        (services.length === 1 &&
          services.find((item) => item.server_type === "default") && (
            <div className={styles.cart__empty}>
              <div className={styles.cart__empty_emoji}>
                <Emoji />
              </div>
              <div className={classNames(styles.cart__empty_text)}>
                Добавленных услуг нет
              </div>
              {width > endpoints.sm && (
                <div className={classNames("mt-12 mb-24 text-regular")}>
                  Добавьте услуги или продолжите для бесплатного размещения
                </div>
              )}
            </div>
          ))}
      {services && services.length > 0 && (
        <div className={styles.cart__services}>
          {services.map(
            (service) =>
              service.server_type !== "default" && (
                <div
                  className={styles.cart__service}
                  key={service.order_service_type}
                >
                  <div className={styles.cart__service_title}>
                    {service?.server_type === "super_vip" && <SuperVip />}
                    {service?.server_type === "vip" && <Vip />}
                    {service.title}
                  </div>
                  <div className={styles.cart__service_price}>
                    {service.price} ₽
                  </div>
                </div>
              )
          )}
        </div>
      )}
      {totalAmount !== 0 && (
        <div className={styles.cart__total}>
          Итого к оплате:
          <span>{totalAmount} ₽</span>
        </div>
      )}

      <button type={"submit"} form={"step2"} className={"btn w-full"}>
        Продолжить
      </button>
    </div>
  );
};
