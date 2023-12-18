import { FC } from "react";

import styles from "./RadioButton.module.scss";

type RadioButtonType = {
  value: number;
  time: number;
  setTime: (time: number) => void;
  disabled?: boolean;
};

export const RadioButton: FC<RadioButtonType> = ({
  value,
  time,
  setTime,
  disabled,
}) => {
  return (
    <div className={styles.radio}>
      <input
        type="radio"
        name={"time"}
        value={value}
        defaultChecked={value === time}
        id={value.toString()}
        placeholder={value.toString()}
        onChange={() => setTime(value)}
        disabled={disabled}
      />
      <label htmlFor={value.toString()}>{value + ":00"}</label>
    </div>
  );
};
