import { FC } from "react";
import Link from "next/link";
import classNames from "classnames";
import { BannerType } from "../../utils/api/types";
import Image from "next/image";

import styles from "./Banner.module.scss";
import Logo from "../../public/images/logo-adv.svg";
import dwarf from "../../public/images/dwarf.png";

export const Banner: FC<BannerType> = ({
  link,
  image,
  type,
  view,
  buttonText,
}) => {
  return (
    <>
      {type === "default" && (
        <div className={classNames(styles.banner, "view_" + view)}>
          <style jsx>{`
            .view_1,
            .view_2 {
              background-image: url(${image.src});
            }
          `}</style>
          <div className={styles.banner__content}>
            <div className={styles.banner__image}>
              <Logo />
            </div>
            <h3 className={styles.banner__title}>
              {view === 1 && "свободное <br /> рекламное место"}
              {view === 2 && "наш telegram-канал"}
            </h3>
            {view === 2 && (
              <>
                <h2 className={"h1"}>L2SRVCOM</h2>
                <div className={styles.banner__content_text}>
                  Узнай об открытии серверов первым
                </div>
              </>
            )}
            {view === 1 && <div className={styles.banner__size}>240X400</div>}
          </div>
          <button
            className={classNames(
              "btn",
              "w-full",
              view === 1 && "btn--white-light",
              view === 2 && "btn--transparent",
              styles.banner__button
            )}
          >
            {buttonText}
          </button>
          {view === 1 && (
            <Image
              className={styles.banner__footer_image}
              src={dwarf}
              alt={"dwarf"}
              title={"dwarf"}
            />
          )}
        </div>
      )}
      {type === "user" && (
        <Link
          href={link}
          className={classNames(styles.banner, styles.banner + "_view" + view)}
        >
          banner user
        </Link>
      )}
    </>
  );
};
