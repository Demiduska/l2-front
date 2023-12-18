import { FC } from "react";
import classNames from "classnames";

import styles from "./Steps.module.scss";

type StepsType = {
  step: number;
  setStep: (step: number) => void;
  className?: string;
};

export const Steps: FC<StepsType> = ({ step, setStep, className }) => {
  return (
    <div className={classNames(className && className, styles.steps, "steps")}>
      <style jsx>{`
        .steps:after {
          width: ${step === 1 ? 0 : 100 / (4 - step) + "%"};
        }
        @media (max-width: 768px) {
          .steps:after {
            width: 2px;
            height: ${step === 1 ? 0 : 100 / (4 - step) + "%"};
          }
        }
      `}</style>
      <button
        onClick={() => setStep(1)}
        className={classNames(step >= 1 && "active")}
      >
        О сервере
      </button>
      <button
        form="step1"
        type="submit"
        className={classNames(step >= 2 && "active")}
      >
        Услуги
      </button>
      <button disabled className={classNames(step >= 3 && "active")}>
        Модерация
      </button>
    </div>
  );
};
