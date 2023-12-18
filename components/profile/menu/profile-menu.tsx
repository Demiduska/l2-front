import { FC } from "react";
import { IMenuItem } from "../../menu/menu";
import Link from "next/link";
import { Container } from "../../common/container/container";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";
import classNames from "classnames";
import { ServerModerationStatusType } from "../../../utils/api/types";
import { useRouter } from "next/router";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";

import Thunder from "../../../public/icons/profile/thunder.svg";
import Profile from "../../../public/icons/profile/login.svg";
import ServersIcon from "../../../public/icons/profile/server-icon.svg";
import Services from "../../../public/icons/profile/rocket.svg";
import Flash from "../../../public/icons/profile/flash.svg";
import styles from "./ProfileMenu.module.scss";
import { endpoints } from "../../../utils/constants";

export const ProfileMenu: FC = () => {
  const userData = useAppSelector(selectUserData);
  const router = useRouter();
  const pathname = router.pathname;
  const [width, height] = useWindowSize();
  const menu: IMenuItem[] = [
    {
      title: "мой профиль",
      link: "/profile",
      mobileTitle: "профиль",
      mobileIcon: <Profile />,
    },
    {
      title: "мои серверы",
      link: "/profile/servers",
      count: userData?.servers ? userData.servers.length : 0,
      mobileTitle: "серверы",
      mobileIcon: <ServersIcon />,
    },
    {
      title: "услуги",
      link: "/profile/services",
      mobileTitle: "услуги",
      mobileIcon: <Services />,
    },
    {
      title: "система скидок",
      link: "/profile/discounts",
      icon: <Thunder />,
      mobileTitle: "скидки",
      mobileIcon: <Flash />,
    },
  ];

  const submenu: IMenuItem[] = [
    {
      title: "Все серверы",
      link: "/profile/servers",
      count: userData?.servers ? userData.servers.length : 0,
    },
    {
      title: "Активные",
      link: "/profile/servers?status=success",
      count: userData?.servers
        ? userData.servers.filter(
            (item) => item.status === ServerModerationStatusType.success
          ).length
        : 0,
    },
    {
      title: "На модерации",
      link: "/profile/servers?status=pending",
      count: userData?.servers
        ? userData.servers.filter(
            (item) => item.status === ServerModerationStatusType.pending
          ).length
        : 0,
    },
    {
      title: "Отклоненные",
      link: "/profile/servers?status=reject",
      count: userData?.servers
        ? userData.servers.filter(
            (item) => item.status === ServerModerationStatusType.reject
          ).length
        : 0,
    },
  ];

  return (
    <>
      <div className={styles.menu__wrap}>
        <Container>
          {width > endpoints.sm && (
            <ul className={styles.menu}>
              {menu.map((item, index) => (
                <li
                  className={classNames(
                    styles.menu__item,
                    item.link === pathname && "active"
                  )}
                  key={index}
                >
                  <Link href={item.link}>
                    <>
                      {item.title}
                      {item.link.includes("servers") && (
                        <span className={styles.menu__item_count}>
                          {item.count}
                        </span>
                      )}
                      {item.icon && item.icon}
                    </>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {width <= endpoints.sm && (
            <div className={styles.menu__mobile}>
              {menu.map((item, index) => (
                <li
                  className={classNames(
                    styles.menu__mobile__item,
                    item.link === pathname && "active"
                  )}
                  key={index}
                >
                  <Link href={item.link}>
                    <>
                      {item.mobileIcon}
                      {item.mobileTitle}
                    </>
                  </Link>
                </li>
              ))}
            </div>
          )}
        </Container>
      </div>
      {pathname === "/profile/servers" && (
        <div className={styles.submenu__wrap}>
          <Container>
            <ul className={styles.submenu}>
              {submenu.map((item, index) => (
                <li
                  className={classNames(
                    styles.submenu__item,
                    router.asPath === item.link && "active"
                  )}
                  key={index + item.link}
                >
                  <Link scroll={false} href={item.link}>
                    {item.title}
                    <span className={styles.submenu__item_count}>
                      {item.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </>
  );
};
