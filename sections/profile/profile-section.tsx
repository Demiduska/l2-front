import React from "react";
import classNames from "classnames";
import { Container } from "../../components/common/container/container";
import { ProfileHeader } from "../../components/profile/header/profile-header";
import { ProfileMenu } from "../../components/profile/menu/profile-menu";

import styles from "./Profile.module.scss";

export default function ProfileSection() {
  return (
    <section className={classNames(styles.profile)}>
      <Container>
        <ProfileHeader />
      </Container>
      <ProfileMenu />
    </section>
  );
}
