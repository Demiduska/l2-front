import { Container } from "../../common/container/container";
import { BannerType, DiscountType } from "../../../utils/api/types";
import telDefault from "../../../public/images/tel-back.png";
import React, { FC } from "react";
import { Banner } from "../../banner/Banner";
import Sidebar from "../../sidebar/Sidebar";
import { CardHead } from "../../card/CardHead";
import { UpdateProfileForm } from "../../common/auth-forms/forms/UpdateProfileForm";
import { UpdatePasswordForm } from "../../common/auth-forms/forms/UpdatePasswordForm";

import styles from "../servers/ProfileServers.module.scss";
import Thunder from "../../../public/icons/profile/thunder.svg";
import { DiscountCard } from "../../card/DiscountCard";

const banner_2: BannerType = {
  link: "/advertising",
  type: "default",
  view: 2,
  image: telDefault,
  buttonText: "Присоединиться",
};

const discounts: DiscountType[] = [
  {
    id: 1,
    title: "Бронзовый уровень",
    content: "Пополнение баланса за все время от 0 ₽ до 10 000 ₽",
    discount: 0,
    min: 0,
    max: 10000,
    level: 1,
  },
  {
    id: 2,
    title: "Серебряный уровень",
    content: "Пополнение баланса за все время от 10 000 ₽ до 100 000 ₽",
    discount: 3,
    min: 10000,
    max: 100000,
    level: 2,
  },
  {
    id: 3,
    title: "Золотой уровень",
    content: "Пополнение баланса за все время от 100 000 ₽ до 250 000 ₽",
    discount: 5,
    min: 100000,
    max: 250000,
    level: 3,
  },
];

export const ProfileDiscounts: FC = () => {
  return (
    <section className={styles.servers}>
      <Container>
        <div className={styles.servers__title}>
          <h2>
            Система скидок <Thunder />
          </h2>
        </div>
        <div className={styles.servers__wrap}>
          <div className={styles.discounts}>
            {discounts.map((item) => (
              <DiscountCard
                key={item.id}
                content={item.content}
                title={item.title}
                id={item.id}
                discount={item.discount}
                min={item.min}
                level={item.level}
                max={item.max}
              />
            ))}
          </div>
          <Sidebar>
            <Banner
              link={banner_2.link}
              image={banner_2.image}
              type={banner_2.type}
              view={banner_2.view}
              buttonText={banner_2.buttonText}
            />
          </Sidebar>
        </div>
      </Container>
    </section>
  );
};
