import { FC } from "react";

import ChevronUp from "../../public/icons/chevron-up.svg";
import styles from "./ButtonUp.module.scss";

export const ButtonUp: FC = () => {
  const scrollUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button onClick={scrollUp} className={styles.button}>
      Наверх
      <span className={styles.button__icon}>
        <ChevronUp />
      </span>
    </button>
  );
};
