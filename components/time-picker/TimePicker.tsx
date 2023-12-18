import { FC, useState } from "react";

import styles from "./TimePicker.module.scss";
import { RadioButton } from "../inputs/radio-button/RadioButton";

let hours: number[] = [];
for (let i = 0; i < 24; i++) {
  hours.push(i);
}

type TimePickerType = {
  time: number;
  setTime: (time: number) => void;
  disabled?: boolean;
};

export const TimePicker: FC<TimePickerType> = ({ time, setTime, disabled }) => {
  return (
    <div className={styles.picker}>
      <div className={styles.picker__head}>Время в UTC +3 (GMT +3)</div>
      <div className={styles.picker__list}>
        {hours.map((hour, index) => (
          <RadioButton
            time={time}
            setTime={setTime}
            key={hour}
            value={hour}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};
