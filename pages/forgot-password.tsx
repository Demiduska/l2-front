import Head from "next/head";
import HeroForm from "../sections/hero/HeroForm";
import React, { useState } from "react";
import Layout from "../components/common/layout/layout";
import { ForgotPasswordForm } from "../components/common/auth-forms/forms/ForgotPasswordForm";
import { SuccessPasswordForm } from "../components/common/auth-forms/forms/SuccessPasswordForm";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";
import { isAxiosError } from "axios";

function ForgotPassword() {
  const [step, setStep] = useState<number>(1);
  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <HeroForm>
        {step === 1 && <ForgotPasswordForm setStep={setStep} type={"page"} />}
        {step === 2 && <SuccessPasswordForm setStep={setStep} type={"page"} />}
      </HeroForm>
    </>
  );
}

export default ForgotPassword;

ForgotPassword.getLayout = function getLayout(page: React.ReactElement) {
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
