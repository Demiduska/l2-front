import { FC } from "react";
import { ServerModerationStatusType } from "../../utils/api/types";

import styles from "./Status.module.scss";
import classNames from "classnames";

type StatusType = {
  className?: string;
  status: ServerModerationStatusType | undefined;
  type?: "server" | "service";
};

export const Status: FC<StatusType> = ({ status, type, className }) => {
  return (
    <span className={classNames(styles.status, status, className && className)}>
      {status === "success" && (type === "server" ? "Активный" : "активно")}
      {status === "pending" && "на модерации"}
      {status === "reject" && "отклонен"}
    </span>
  );
};
