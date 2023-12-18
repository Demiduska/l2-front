import React, { FC, useState } from "react";
import { Container } from "../../components/common/container/container";
import { Steps } from "../../components/steps/steps";
import Link from "next/link";
import classNames from "classnames";
import { Step2 } from "../../components/step/Step2";
import { Step1 } from "../../components/step/Step1";

import styles from "./AddServerSection.module.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { Cart } from "../../components/cart/Cart";
import { SelectTextOptionType } from "../../components/inputs/select/SelectText";
import { ServerTagType } from "../../utils/api/types";

const chronics: SelectTextOptionType[] = [
  {
    name: "Interlude",
    value: "interlude",
    id: 1,
  },
  {
    name: "Interlude+",
    value: "interlude+",
    id: 2,
  },
  {
    name: "High Five",
    value: "high-five",
    id: 3,
  },
  {
    name: "Epilogue",
    value: "epilogue",
    id: 4,
  },
  {
    name: "C4",
    value: "c4",
    id: 5,
  },
  {
    name: "G.Crusade",
    value: "gcrusade",
    id: 6,
  },
];
const serverTags: ServerTagType[] = [
  { id: 1, name: "Custom", content: "Custom server", slug: "custom" },
  { id: 2, name: "Low Rate", content: "Low Rate", slug: "low-rate" },
  {
    id: 7,
    name: "Бонус новичкам",
    content: "Бонус новичкам",
    slug: "bonus-for-newbies",
  },
  {
    id: 3,
    name: "PvP",
    content: "PvP",
    slug: "pvp",
  },
  { id: 4, name: "Craft", content: "Craft", slug: "craft" },
  {
    id: 10,
    name: "Денежная награда",
    content: "Денежная награда",
    slug: "cash-reward",
  },
  {
    id: 5,
    name: "RvR",
    content: "RvR",
    slug: "rvr",
  },
  { id: 6, name: "Multicraft", content: "Multicraft", slug: "multicraft" },
  {
    id: 13,
    name: "Бонус за продвижение",
    content: "Бонус за продвижение",
    slug: "promotion-bonus",
  },
  { id: 8, name: "GVE", content: "GVE", slug: "gve" },
  { id: 9, name: "Multiproof", content: "Multiproof", slug: "multiproof" },
  {
    id: 14,
    name: "Международный сервер",
    content: "Международный сервер",
    slug: "international-server",
  },
  {
    id: 12,
    name: "Запуск OBT",
    content: "Запуск OBT",
    slug: "launch-obt",
  },
  {
    id: 11,
    name: "PTS",
    content: "PTS",
    slug: "pts",
  },
];

export const AddServerSection: FC = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <section className={styles.section}>
      <Container>
        <h1>Добавить сервер</h1>
        <div className={styles.section__steps}>
          <div>
            <Steps step={step} setStep={setStep} />
            {step === 1 && (
              <Step1
                chronics={chronics}
                serverTags={serverTags}
                setStep={setStep}
              />
            )}
            {step === 2 && (
              <Step2
                chronics={chronics}
                serverTags={serverTags}
                setStep={setStep}
              />
            )}
          </div>
          <Sidebar>
            {step === 1 && (
              <div className={classNames("text-center")}>
                Нажимая на кнопку “Продолжить” я подтверждаю, что ознакомлен с{" "}
                <br />
                <Link className={"link--blue"} href={"/terms"}>
                  правилами сервиса
                </Link>
                <button
                  form="step1"
                  type="submit"
                  className={"btn w-full mt-sm-12 mt-18"}
                >
                  Продолжить
                </button>
              </div>
            )}
            {step === 2 && <Cart />}
          </Sidebar>
        </div>
      </Container>
    </section>
  );
};
