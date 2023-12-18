import Head from "next/head";
import HeroForm from "../sections/hero/HeroForm";
import { RegisterForm } from "../components/common/auth-forms/forms/RegisterForm";
import React, { useState } from "react";
import Layout from "../components/common/layout/layout";
import { SuccessRegistrationForm } from "../components/common/auth-forms/forms/SuccessRegistrationForm";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";
import { isAxiosError } from "axios";

function Registration() {
  const [step, setStep] = useState<number>(1);

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <HeroForm>
        {step == 1 && <RegisterForm type={"page"} setStep={setStep} />}
        {step == 2 && <SuccessRegistrationForm type={"page"} />}
      </HeroForm>
    </>
  );
}

Registration.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout type={"empty"}>{page}</Layout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { req } = ctx;
    try {
      if (req.cookies?.Authentication) {
        const data = await Api(ctx).user.getMe();
        if (data?.email) {
          store.dispatch(setUserData(data));
          return {
            props: {},
            redirect: {
              destination: "/profile",
              permanent: false,
            },
          };
        }
      }
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response?.data.message);
      }
    }
    return {
      props: {},
    };
  }
);

export default Registration;
