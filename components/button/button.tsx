import { FC } from "react";

interface IButton {
  text: string;
  type: string;
}

export const Button: FC<IButton> = ({ text, type }) => {
  return <button></button>;
};
