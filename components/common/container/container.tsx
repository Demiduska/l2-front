import React, { ReactNode } from "react";
import classNames from "classnames";

export function Container({ children }: { children: ReactNode }) {
  return <div className={classNames("container")}>{children}</div>;
}
