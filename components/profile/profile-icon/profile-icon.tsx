import React, { FC } from "react";
import Image from "next/image";
import { generateFileUrl } from "../../../utils/helpers/generateFileUrl";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";

import styles from "./ProfileIcon.module.scss";

export const ProfileIcon: FC = () => {
  const userData = useAppSelector(selectUserData);

  return (
    <div className={styles.icon}>
      {userData?.avatarId && userData.avatar?.path ? (
        <Image
          src={generateFileUrl(userData.avatar.path)}
          width={48}
          height={48}
          alt={"avatar"}
          quality={100}
        />
      ) : (
        <span>{userData?.email.at(0)}</span>
      )}
    </div>
  );
};
