import { FC, useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectFormType,
  selectIsVisibleForm,
  setFormType,
  setVisibleForm,
} from "../../../redux/slices/common";
import Modal from "../../modal/Modal";
import { LoginForm } from "./forms/LoginForm";

import styles from "./AuthForms.module.scss";
import Close from "../../../public/icons/close.svg";
import classNames from "classnames";

export const AuthForms: FC = () => {
  const dispatch = useAppDispatch();
  const isVisibleForm = useAppSelector(selectIsVisibleForm);
  const formType = useAppSelector(selectFormType);
  const onClickCloseForm = () => {
    dispatch(setFormType(null));
    dispatch(setVisibleForm(false));
  };

  useEffect(() => {
    if (isVisibleForm) {
      document.getElementById("body")?.classList.add("hidden");
    } else {
      document.getElementById("body")?.classList.remove("hidden");
    }
    return () => {
      document.getElementById("body")?.classList.remove("hidden");
    };
  }, [isVisibleForm]);

  useEffect(() => {
    return () => {
      dispatch(setFormType(null));
      dispatch(setVisibleForm(false));
    };
  }, []);

  return (
    <>
      {isVisibleForm && (
        <motion.div
          className={styles.popup}
          initial={{
            opacity: 0,
            // scale: 0.5,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            opacity: 1,
            // scale: 1,
            translateX: "-50%",
            translateY: "-50%",
          }}
          exit={{
            opacity: 0,
            scale: 0,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <button className={styles.popup__close} onClick={onClickCloseForm}>
            <Close />
          </button>
          {formType === "login" && (
            <Modal>
              <LoginForm type={"popup"} />
            </Modal>
          )}
        </motion.div>
      )}
      <div
        className={classNames(
          styles.popup__close_wrap,
          isVisibleForm ? styles.popup__close_wrap_open : ""
        )}
        onClick={onClickCloseForm}
      />
    </>
  );
};
