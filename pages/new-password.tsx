import Head from "next/head";
import HeroForm from "../sections/hero/HeroForm";
import React, { useState } from "react";
import Layout from "../components/common/layout/layout";
import { NewPasswordForm } from "../components/common/auth-forms/forms/NewPasswordForm";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";
import { isAxiosError } from "axios";
import { SuccessNewPasswordForm } from "../components/common/auth-forms/forms/SuccessNewPasswordForm";

function NewPassword() {
  const [step, setStep] = useState<number>(1);

  return (
    <>
      <Head>
        <title>New password</title>
      </Head>
      <HeroForm>
        {step === 1 && <NewPasswordForm type={"page"} setStep={setStep} />}
        {step === 2 && (
          <SuccessNewPasswordForm type={"page"} setStep={setStep} />
        )}
      </HeroForm>
    </>
  );
}

NewPassword.getLayout = function getLayout(page: React.ReactElement) {
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

export default NewPassword;
