import { FC } from "react";

import Visa from "../../public/icons/visa.svg";
import MasterCard from "../../public/icons/mastercard.svg";
import Mir from "../../public/icons/mir.svg";
import styles from "./Payments.module.scss";

export const Payments: FC = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.list__item}>
        <Visa />
      </li>
      <li className={styles.list__item}>
        <MasterCard />
      </li>
      <li className={styles.list__item}>
        <Mir />
      </li>
    </ul>
  );
};
