import { Container } from "../../common/container/container";
import { BannerType } from "../../../utils/api/types";
import telDefault from "../../../public/images/tel-back.png";
import React, { FC } from "react";
import { Banner } from "../../banner/Banner";
import Sidebar from "../../sidebar/Sidebar";
import { CardHead } from "../../card/CardHead";
import { UpdateProfileForm } from "../../common/auth-forms/forms/UpdateProfileForm";
import { UpdatePasswordForm } from "../../common/auth-forms/forms/UpdatePasswordForm";

import styles from "../servers/ProfileServers.module.scss";

const banner_2: BannerType = {
  link: "/advertising",
  type: "default",
  view: 2,
  image: telDefault,
  buttonText: "Присоединиться",
};

export const ProfileEdit: FC = () => {
  return (
    <section className={styles.servers}>
      <Container>
        <div className={styles.servers__title}>
          <h2>Мой профиль</h2>
        </div>
        <div className={styles.servers__wrap}>
          <div className={styles.edit}>
            <div>
              <CardHead title={"Персональная информация"} />
              <UpdateProfileForm type={"page"} />
            </div>
            <div>
              <CardHead title={"сменить пароль"} />
              <UpdatePasswordForm type={"page"} />
            </div>
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
