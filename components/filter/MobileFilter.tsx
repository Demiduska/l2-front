import React, { FC } from "react";
import { BannerType, FiltersType, FilterType } from "../../utils/api/types";
import { motion } from "framer-motion";
import styles from "../common/auth-forms/AuthForms.module.scss";
import Close from "../../public/icons/close.svg";
import Modal from "../modal/Modal";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectFormType,
  selectIsVisibleForm,
  setFormType,
  setVisibleForm,
} from "../../redux/slices/common";
import { Filters } from "../filters/Filters";
import { Banner } from "../banner/Banner";
import Filter from "../../public/icons/filter.svg";

type MobileFilter = {
  filters: FilterType[];
};

export const MobileFilter: FC<MobileFilter> = ({ filters }) => {
  const dispatch = useAppDispatch();
  const isVisibleForm = useAppSelector(selectIsVisibleForm);
  const formType = useAppSelector(selectFormType);
  const onClickCloseForm = () => {
    dispatch(setFormType(null));
    dispatch(setVisibleForm(false));
  };

  return (
    <>
      {isVisibleForm && (
        <motion.div
          className={styles.popup__filter}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0,
          }}
        >
          <button className={styles.popup__close} onClick={onClickCloseForm}>
            <Close />
          </button>
          {formType === "filter" && (
            <Modal>
              <div className={styles.popup__filter_header}>
                <Filter />
                Фильтр
              </div>
              <Filters filters={filters} />
              <div className={styles.popup__filter_buttons}>
                <button className={classNames("btn w-full")}>Применить</button>
                <button className={classNames("btn--reset w-full")}>
                  Сбросить
                </button>
              </div>
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
