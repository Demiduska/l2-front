import React, { FC, useState } from "react";
import { Container } from "../../components/common/container/container";
import { StatisticInfo } from "../../components/statistic-info/statistic-info";
import { Calendar } from "../../components/calendar/Calendar";
import { Filters } from "../../components/filters/Filters";
import {
  AllServersType,
  BannerType,
  FilterType,
  ResponseServers,
  SelectServer,
} from "../../utils/api/types";
import { Banner } from "../../components/banner/Banner";
import { Servers } from "../../components/servers/Servers";
import { Notification } from "../../components/notification/Notification";
import { Pagination } from "../../components/pagination/Pagination";
import { SeoText } from "../../components/seo-text/seo-text";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { useAppDispatch } from "../../redux/hooks";
import { setFormType, setVisibleForm } from "../../redux/slices/common";
import { MobileFilter } from "../../components/filter/MobileFilter";
import classNames from "classnames";
import { endpoints } from "../../utils/constants";
import Skeleton from "react-loading-skeleton";
import Filter from "../../public/icons/filter.svg";
import useSWR, { Fetcher } from "swr";
import { Api } from "../../utils/api";
import { addDays, format } from "date-fns";
import { useTheme } from "next-themes";

import styles from "./ServersSection.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

export type SectionServersType = {
  title: string;
  filters: FilterType[];
  banner_1: BannerType;
  banner_2: BannerType;
};

const fetcher: Fetcher<ResponseServers, SelectServer> = (data) =>
  Api().server.getServersByDates(data);

const openedVipServersParams: SelectServer = {
  dateEnd: format(addDays(new Date(), 1), "yyyy-MM-dd"),
  limit: 5,
  vip: true,
};

const openSoonVipServersParams: SelectServer = {
  dateFrom: format(new Date(), "yyyy-MM-dd"),
  limit: 5,
  vip: true,
};
const todayServersDatesParams: SelectServer = {
  dateFrom: format(new Date(), "yyyy-MM-dd"),
  dateEnd: format(addDays(new Date(), 1), "yyyy-MM-dd"),
  limit: 6,
  vip: false,
};

const tomorrowServersDatesParams: SelectServer = {
  dateFrom: format(addDays(new Date(), 1), "yyyy-MM-dd"),
  dateEnd: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  limit: 6,
  vip: false,
};

const last10DaysServersDatesParams: SelectServer = {
  dateFrom: format(addDays(new Date(), -10), "yyyy-MM-dd"),
  dateEnd: format(addDays(new Date(), 1), "yyyy-MM-dd"),
  limit: 6,
  vip: false,
};

const next10DaysServersDatesParams: SelectServer = {
  dateFrom: format(new Date(), "yyyy-MM-dd"),
  dateEnd: format(addDays(new Date(), 10), "yyyy-MM-dd"),
  limit: 6,
  vip: false,
};

const tenDaysAndLessServersDatesParams: SelectServer = {
  dateEnd: format(addDays(new Date(), -10), "yyyy-MM-dd"),
  limit: 6,
  vip: false,
};

const tenDaysAndMoreServersDatesParams: SelectServer = {
  dateFrom: format(addDays(new Date(), 10), "yyyy-MM-dd"),
  limit: 6,
  vip: false,
};

export const ServersSection: FC<SectionServersType> = ({
  title,
  filters,
  banner_1,
  banner_2,
}) => {
  const {
    data: todayServers,
    error: errorTodayServers,
    isLoading: isLoadingTodayServers,
  } = useSWR(todayServersDatesParams, fetcher);
  const {
    data: openedVipServers,
    error: errorOpenedVipServers,
    isLoading: isLoadingOpenedVipServers,
  } = useSWR(openedVipServersParams, fetcher);

  const {
    data: openSoonVipServers,
    error: errorOpenSoonVipServers,
    isLoading: isLoadingOpenSoonVipServers,
  } = useSWR(openSoonVipServersParams, fetcher);

  const {
    data: tomorrowServers,
    error: errorTomorrowServers,
    isLoading: isLoadingTomorrowServers,
  } = useSWR(tomorrowServersDatesParams, fetcher);

  const {
    data: last10DaysServers,
    error: errorLast10DaysServers,
    isLoading: isLoadingLast10DaysServers,
  } = useSWR(last10DaysServersDatesParams, fetcher);

  const {
    data: next10DaysServers,
    error: errorNext10DaysServers,
    isLoading: isLoadingNext10DaysServers,
  } = useSWR(next10DaysServersDatesParams, fetcher);

  const {
    data: tenDaysAndLessServers,
    error: errorTenDaysAndLessServers,
    isLoading: isLoadingTenDaysAndLessServers,
  } = useSWR(tenDaysAndLessServersDatesParams, fetcher);

  const {
    data: tenDaysAndMoreServers,
    error: errorTenDaysAndMoreServers,
    isLoading: isLoadingTenDaysAndMoreServers,
  } = useSWR(tenDaysAndMoreServersDatesParams, fetcher);

  const dispatch = useAppDispatch();
  const [width, height] = useWindowSize();
  const handleClickOnFilterButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(setVisibleForm(true));
    dispatch(setFormType("filter"));
  };
  const [status, setStatus] = useState<"opened" | "soon">("soon");
  const { theme, setTheme } = useTheme();

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.section__wrap}>
          <div className={styles.section__title}>
            <h1 dangerouslySetInnerHTML={{ __html: title }} />
          </div>
          <div className={styles.section__info}>
            <StatisticInfo type={"server"} count={1683} title={"серверов"} />
            <StatisticInfo type={"users"} count={168} title={"на сайте"} />
          </div>
          <div className={styles.section__calendar}>
            <Calendar />
          </div>
          <div className={styles.section__sidebar}>
            {width <= endpoints.oxl && (
              <button
                className={styles.section__sidebar_button}
                onClick={handleClickOnFilterButton}
              >
                Фильтр
                <Filter />
              </button>
            )}
            {width <= endpoints.oxl && <MobileFilter filters={filters} />}
            {width > endpoints.oxl && (
              <>
                <Filters filters={filters} />
                <Banner
                  link={banner_1.link}
                  image={banner_1.image}
                  type={banner_1.type}
                  view={banner_1.view}
                  buttonText={banner_1.buttonText}
                />
                <Banner
                  link={banner_2.link}
                  image={banner_2.image}
                  type={banner_2.type}
                  view={banner_2.view}
                  buttonText={banner_2.buttonText}
                />
              </>
            )}
          </div>
          <div className={styles.section__servers}>
            {width <= endpoints.lg && (
              <div className={styles.section__servers_fix_bottom}>
                <button
                  onClick={() => setStatus("soon")}
                  className={classNames(
                    status === "soon" ? "btn active" : "btn--black-light"
                  )}
                >
                  скоро откроются
                </button>
                <button
                  onClick={() => setStatus("opened")}
                  className={classNames(
                    status === "opened" ? "btn active" : "btn--black-light"
                  )}
                >
                  уже открылись
                </button>
              </div>
            )}
            <div className={styles.section__servers_wrap}>
              {width > endpoints.lg && (
                <>
                  <div className={styles.section__servers_left_1}>
                    {isLoadingOpenedVipServers ? (
                      <Skeleton
                        baseColor={theme === "dark" ? "#E2E6ED" : "#FFFFFF"}
                        highlightColor={
                          theme === "dark" ? "#C8CDD6" : "#C8CDD6"
                        }
                        className={styles.section__skeleton}
                        count={5}
                        height={49}
                        borderRadius={10}
                        inline={true}
                      />
                    ) : (
                      openedVipServers?.items &&
                      openedVipServers.items.length > 0 && (
                        <Servers
                          title={"Уже открылись"}
                          items={openedVipServers.items}
                          withIcons={true}
                        />
                      )
                    )}
                  </div>

                  <div className={styles.section__servers_left_2}>
                    {todayServers?.items && (
                      <Servers title={"Сегодня"} items={todayServers.items} />
                    )}
                  </div>
                  <div className={styles.section__servers_left_3}>
                    {last10DaysServers?.items &&
                      last10DaysServers.items.length > 0 && (
                        <Servers
                          title={"В предыдущие 10 дней"}
                          items={last10DaysServers.items}
                        />
                      )}
                  </div>
                  <div className={styles.section__servers_right_1}>
                    {isLoadingOpenSoonVipServers ? (
                      <Skeleton
                        className={styles.section__skeleton}
                        count={5}
                        height={49}
                        borderRadius={10}
                        inline={true}
                      />
                    ) : (
                      openSoonVipServers?.items &&
                      openSoonVipServers.items.length > 0 && (
                        <Servers
                          title={"Скоро откроются"}
                          items={openSoonVipServers.items}
                          withIcons={true}
                        />
                      )
                    )}
                  </div>
                  <div className={styles.section__servers_right_2}>
                    {tomorrowServers?.items &&
                      tomorrowServers.items.length > 0 && (
                        <Servers
                          title={"Завтра"}
                          items={tomorrowServers.items}
                        />
                      )}
                  </div>
                  <div className={styles.section__servers_right_3}>
                    {next10DaysServers?.items &&
                      next10DaysServers.items.length > 0 && (
                        <Servers
                          title={"Cледующие 10 дней"}
                          items={next10DaysServers.items}
                        />
                      )}
                  </div>
                  <div className={styles.section__servers_notification}>
                    <Notification />
                  </div>
                  <div className={styles.section__servers_left_4}>
                    {tenDaysAndLessServers?.items &&
                      tenDaysAndLessServers.items.length > 0 && (
                        <>
                          <Servers
                            title={"10 дней назад и ранее"}
                            items={tenDaysAndLessServers.items}
                          />
                          <Pagination />
                        </>
                      )}
                  </div>
                  <div className={styles.section__servers_right_4}>
                    {tenDaysAndMoreServers?.items &&
                      tenDaysAndMoreServers.items.length > 0 && (
                        <>
                          <Servers
                            title={"через 10 дней и позже"}
                            items={tenDaysAndMoreServers.items}
                          />
                          <Pagination />
                        </>
                      )}
                  </div>
                </>
              )}
              {width <= endpoints.lg && (
                <>
                  {status === "soon" ? (
                    <>
                      <div className={styles.section__servers_right_1}>
                        {openSoonVipServers?.items &&
                          openSoonVipServers.items.length > 0 && (
                            <Servers
                              title={"Скоро откроются"}
                              items={openSoonVipServers.items}
                              withIcons={true}
                            />
                          )}
                      </div>
                      <div className={styles.section__servers_right_2}>
                        {tomorrowServers?.items &&
                          tomorrowServers.items.length > 0 && (
                            <Servers
                              title={"Завтра"}
                              items={tomorrowServers.items}
                            />
                          )}
                      </div>
                      <div className={styles.section__servers_right_3}>
                        {next10DaysServers?.items &&
                          next10DaysServers.items.length > 0 && (
                            <Servers
                              title={"Cледующие 10 дней"}
                              items={next10DaysServers.items}
                            />
                          )}
                      </div>
                      <div className={styles.section__servers_notification}>
                        <Notification />
                      </div>
                      <div className={styles.section__servers_right_4}>
                        <div className={styles.section__servers_right_4}>
                          {tenDaysAndMoreServers?.items &&
                            tenDaysAndMoreServers.items.length > 0 && (
                              <>
                                <Servers
                                  title={"через 10 дней и позже"}
                                  items={tenDaysAndMoreServers.items}
                                />
                                <Pagination />
                              </>
                            )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.section__servers_right_1}>
                        {openedVipServers?.items &&
                          openedVipServers.items.length > 0 && (
                            <Servers
                              title={"Уже открылись"}
                              items={openedVipServers.items}
                              withIcons={true}
                            />
                          )}
                      </div>
                      <div className={styles.section__servers_right_2}>
                        {todayServers?.items && (
                          <Servers
                            title={"Сегодня"}
                            items={todayServers.items}
                          />
                        )}
                      </div>
                      <div className={styles.section__servers_right_3}>
                        {last10DaysServers?.items &&
                          last10DaysServers.items.length > 0 && (
                            <Servers
                              title={"В предыдущие 10 дней"}
                              items={last10DaysServers.items}
                            />
                          )}
                      </div>
                      <div className={styles.section__servers_notification}>
                        <Notification />
                      </div>
                      <div className={styles.section__servers_right_4}>
                        {tenDaysAndLessServers?.items &&
                          tenDaysAndLessServers.items.length > 0 && (
                            <>
                              <Servers
                                title={"10 дней назад и ранее"}
                                items={tenDaysAndLessServers.items}
                              />
                              <Pagination />
                            </>
                          )}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className={styles.section__seo}>
            {width <= endpoints.md && (
              <Banner
                link={banner_2.link}
                image={banner_2.image}
                type={banner_2.type}
                view={banner_2.view}
                buttonText={banner_2.buttonText}
              />
            )}
            <SeoText />
          </div>
        </div>
      </Container>
    </section>
  );
};
