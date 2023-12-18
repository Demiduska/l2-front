import React, { FC } from "react";
import Login from "../../public/icons/login.svg";
import { useAppDispatch } from "../../redux/hooks";
import { setFormType, setVisibleForm } from "../../redux/slices/common";

type ButtonLoginType = {
  className?: string;
  text?: string;
};

export const ButtonLogin: FC<ButtonLoginType> = ({ className, text }) => {
  const dispatch = useAppDispatch();
  const onClickLoginButton = () => {
    dispatch(setVisibleForm(true));
    dispatch(setFormType("login"));
  };

  return (
    <button
      onClick={onClickLoginButton}
      className={className ? className : "profile-link"}
    >
      {text ? text : <Login />}
    </button>
  );
};
