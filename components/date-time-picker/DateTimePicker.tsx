import React, { FC, useEffect, useState } from "react";

import { addDays, format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import ru from "date-fns/locale/ru";
import classNames from "classnames";
import { TimePicker } from "../time-picker/TimePicker";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import styles from "./DateTimePicker.module.scss";
import { combineDateAndTime } from "../../utils/helpers/combineDateAndTime";
import { useAppSelector } from "../../redux/hooks";
import { selectOpenDate, selectServerData } from "../../redux/slices/server";

export type DateTimePickerType<TFormValues extends FieldValues> = {
  className?: string;
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<FieldValues, FieldError>>;
  setValue?: any;
  disabled?: boolean;
};

export const DateTimePicker = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  register,
  errors,
  setValue,
  disabled,
}: DateTimePickerType<TFormValues>) => {
  const defaultDate = useAppSelector(selectOpenDate);
  const defaultTime = defaultDate
    ? new Date(defaultDate).getHours()
    : new Date().getHours();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(
    defaultDate ? new Date(defaultDate) : new Date()
  );
  const [time, setTime] = useState<number>(defaultTime);
  const [combineDate, setCombineDate] = useState<Date>(
    new Date(defaultDate ? new Date(defaultDate) : new Date())
  );

  useEffect(() => {
    if (selectedDay) {
      const open_date = combineDateAndTime(selectedDay, time);
      setCombineDate(open_date);
      setValue("open_date", open_date);
    }
  }, [selectedDay, time]);

  return (
    <>
      <div className={classNames(className && className, styles.picker)}>
        <DayPicker
          locale={ru}
          styles={{
            root: { margin: 0 },
          }}
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          disabled={disabled}
          required
        />
        <TimePicker time={time} setTime={setTime} disabled={disabled} />
        <input
          style={{ display: "none" }}
          type={"text"}
          name={name}
          value={combineDate.toString()}
          {...(register && register(name))}
          disabled={disabled}
        />
      </div>
      {errors?.[name]?.message && (
        <span
          className={classNames(
            "text-red mt-6",
            "text-error",
            styles.label__error
          )}
        >
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};
