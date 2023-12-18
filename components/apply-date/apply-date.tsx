import React, { FC } from "react";
import classNames from "classnames";
import { convertToDateWithOptions } from "../../utils/helpers/convertToDateWithOptions";

import styles from "./ApplyDate.module.scss";
import { isToday } from "date-fns";

interface IApplyDate {
  className?: string;
  date: Date;
}

export const ApplyDate: FC<IApplyDate> = ({ date, className }) => {
  return (
    <div className={classNames(className && className, styles.item)}>
      Применится {isToday(date) ? "сегодня" : convertToDateWithOptions(date)}
    </div>
  );
};
