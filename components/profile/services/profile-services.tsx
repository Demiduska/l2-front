import { Container } from "../../common/container/container";
import { BannerType, ResponseServices } from "../../../utils/api/types";
import telDefault from "../../../public/images/tel-back.png";
import React, { FC, useState } from "react";
import { Banner } from "../../banner/Banner";
import Sidebar from "../../sidebar/Sidebar";
import { Select } from "../../inputs/select/Select";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";

import styles from "../servers/ProfileServers.module.scss";
import useSWR, { Fetcher } from "swr";
import { Api } from "../../../utils/api";
import { AddServiceCard } from "../../card/AddServiceCard";

const banner_2: BannerType = {
  link: "/advertising",
  type: "default",
  view: 2,
  image: telDefault,
  buttonText: "Присоединиться",
};

type VariantType = {
  title: string;
  value: number;
};

const fetcher: Fetcher<ResponseServices, string> = (date) =>
  Api().service.getServices(date);

export const ProfileServices: FC = () => {
  const userData = useAppSelector(selectUserData);
  const servers: VariantType[] | undefined = userData?.servers?.map(
    (server) => ({
      title: server.name,
      value: server.id,
    })
  );
  const [serverId, setServerId] = useState<number | null>(
    userData?.servers ? userData.servers[0].id : null
  );
  const { data, error, isLoading } = useSWR({ openDate: "" }, fetcher);

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    setServerId(selectedValue);
  };

  return (
    <section className={styles.servers}>
      <Container>
        <div className={styles.servers__title}>
          <h2>Услуги</h2>
        </div>
        {servers && (
          <div className={styles.services__servers}>
            Применить для сервера{" "}
            <Select
              name={"servers"}
              variants={servers}
              onChange={onSelectChange}
            />
          </div>
        )}

        <div className={styles.servers__wrap}>
          <div className={styles.services}>
            {servers ? (
              <div>
                {data?.packages.map((item, index) => (
                  <AddServiceCard
                    key={item[index].id}
                    available={item[index].available}
                    days={item[index].days}
                    group={item[index].group}
                    id={item[index].id}
                    unitPrice={item[index].unitPrice}
                    maxCount={item[index].maxCount}
                    start_date={item[index].start_date}
                    end_date={item[index].end_date}
                    title={item[index].title}
                    type={item[index].type}
                    content={item[index].content}
                    serverId={serverId}
                  />
                ))}
              </div>
            ) : (
              "Empty"
            )}
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
