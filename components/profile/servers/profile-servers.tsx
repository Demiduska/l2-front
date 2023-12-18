import React, { FC } from "react";
import { Container } from "../../common/container/container";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";

import Add from "../../../public/icons/profile/add.svg";
import styles from "./ProfileServers.module.scss";
import {
  BannerType,
  ServerModerationStatusType,
} from "../../../utils/api/types";
import { ServerProfileCard } from "../../card/ServerProfileCard";
import Sidebar from "../../sidebar/Sidebar";
import { Banner } from "../../banner/Banner";
import telDefault from "../../../public/images/tel-back.png";

const banner_2: BannerType = {
  link: "/advertising",
  type: "default",
  view: 2,
  image: telDefault,
  buttonText: "Присоединиться",
};

export const ProfileServers: FC = () => {
  const router = useRouter();
  const userData = useAppSelector(selectUserData);

  const { status } = router.query;

  const activeServers = userData?.servers
    ? userData.servers.filter(
        (item) => item.status === ServerModerationStatusType.success
      )
    : [];

  const pendingServers = userData?.servers
    ? userData.servers.filter(
        (item) => item.status === ServerModerationStatusType.pending
      )
    : [];

  const rejectServers = userData?.servers
    ? userData.servers.filter(
        (item) => item.status === ServerModerationStatusType.reject
      )
    : [];

  return (
    <section className={styles.servers}>
      <Container>
        <div className={styles.servers__title}>
          <h2>Все серверы</h2>
          <Link className={styles.servers__title_link} href={"/add-server"}>
            <Add />
            Добавить
          </Link>
        </div>
        <div className={styles.servers__wrap}>
          <div className={styles.servers__list}>
            {userData?.servers && userData.servers.length > 0
              ? status === ServerModerationStatusType.success
                ? activeServers.length > 0
                  ? activeServers.map((item, index) => (
                      <ServerProfileCard
                        key={item.id + ServerModerationStatusType.success}
                        id={item.id}
                        name={item.name}
                        link={item.link}
                        rates={item.rates}
                        server_type={item.server_type}
                        open_date={item.open_date}
                        chronic={item.chronic}
                        serverTags={item.serverTags}
                        cash_reward_text={item.cash_reward_text}
                        bonus_for_newbies_text={item.bonus_for_newbies_text}
                        promotion_bonus_text={item.promotion_bonus_text}
                        status={item.status}
                        orders={item.orders}
                      />
                    ))
                  : "Пусто"
                : status === ServerModerationStatusType.pending
                ? pendingServers.length > 0
                  ? pendingServers.map((item, index) => (
                      <ServerProfileCard
                        key={item.id + ServerModerationStatusType.pending}
                        id={item.id}
                        name={item.name}
                        link={item.link}
                        rates={item.rates}
                        server_type={item.server_type}
                        open_date={item.open_date}
                        chronic={item.chronic}
                        serverTags={item.serverTags}
                        cash_reward_text={item.cash_reward_text}
                        bonus_for_newbies_text={item.bonus_for_newbies_text}
                        promotion_bonus_text={item.promotion_bonus_text}
                        status={item.status}
                        orders={item.orders}
                      />
                    ))
                  : "Пусто"
                : status === ServerModerationStatusType.reject
                ? rejectServers.length > 0
                  ? rejectServers.map((item, index) => (
                      <ServerProfileCard
                        key={item.id + ServerModerationStatusType.reject}
                        id={item.id}
                        name={item.name}
                        link={item.link}
                        rates={item.rates}
                        server_type={item.server_type}
                        open_date={item.open_date}
                        chronic={item.chronic}
                        serverTags={item.serverTags}
                        cash_reward_text={item.cash_reward_text}
                        bonus_for_newbies_text={item.bonus_for_newbies_text}
                        promotion_bonus_text={item.promotion_bonus_text}
                        status={item.status}
                        orders={item.orders}
                      />
                    ))
                  : "Пусто"
                : userData.servers.map((item) => (
                    <ServerProfileCard
                      key={item.id + "all"}
                      id={item.id}
                      name={item.name}
                      link={item.link}
                      rates={item.rates}
                      server_type={item.server_type}
                      open_date={item.open_date}
                      chronic={item.chronic}
                      serverTags={item.serverTags}
                      cash_reward_text={item.cash_reward_text}
                      bonus_for_newbies_text={item.bonus_for_newbies_text}
                      promotion_bonus_text={item.promotion_bonus_text}
                      status={item.status}
                      orders={item.orders}
                    />
                  ))
              : "Пусто..."}
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
