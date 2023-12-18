import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import styles from "./HeadBaner.module.scss";

export interface IHeadBanner {
  title: string;
  link: string;
  image: StaticImageData;
}

export const HeadBanner: FC<IHeadBanner> = ({ title, link, image }) => {
  return (
    <section className={styles.section}>
      {link ? (
        <Link href={link}>
          <Image
            className={styles.section__image}
            src={image}
            alt={title}
            title={title}
            width={1920}
          />
        </Link>
      ) : (
        <Image
          className={styles.section__image}
          src={image}
          alt={title}
          title={title}
          width={1920}
        />
      )}
    </section>
  );
};
