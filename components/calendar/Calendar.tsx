import { FC, useState } from "react";
import {
  Datepicker,
  DatepickerEvent,
} from "@meinefinsternis/react-horizontal-date-picker";
import { ru } from "date-fns/locale";

import styles from "./Calendar.module.scss";

export const Calendar: FC = () => {
  const [date, setDate] = useState<{
    endValue: Date | null;
    startValue: Date | null;
    rangeDates: Date[] | null;
  }>({
    startValue: null,
    endValue: null,
    rangeDates: [],
  });

  const handleChange = (d: DatepickerEvent) => {
    const [startValue, endValue, rangeDates] = d;
    setDate((prev) => ({ ...prev, endValue, startValue, rangeDates }));
  };

  return (
    <div className={styles.calendar}>
      <Datepicker
        onChange={handleChange}
        locale={ru}
        startValue={date.startValue}
        endValue={date.endValue}
        classNames={{
          monthLabel: styles.calendar__month_title,
          dayItem: styles.calendar__day,
          dayLabel: styles.calendar__day_label,
          dateLabel: styles.calendar__day_value,
        }}
      />
    </div>
  );
};
