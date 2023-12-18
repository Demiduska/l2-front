import Head from "next/head";
import HeroForm from "../sections/hero/HeroForm";
import React from "react";
import Layout from "../components/common/layout/layout";
import { ConfirmEmailForm } from "../components/common/auth-forms/forms/ConfirmEmailForm";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { isAxiosError } from "axios";

function ConfirmEmail({ status }: { status: string }) {
  return (
    <>
      <Head>
        <title>Confirm Email</title>
      </Head>
      <HeroForm>
        <ConfirmEmailForm status={status} type={"page"} />
      </HeroForm>
    </>
  );
}

ConfirmEmail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout type={"empty"}>{page}</Layout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    let status: string = "";
    try {
      if (ctx.query?.token) {
        const data = await Api().user.confirmEmail({ token: ctx.query.token });
        status = data;
      }
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response?.data.message);
        status = err.response?.data.message;
      }
    }
    return {
      props: { status },
    };
  }
);

export default ConfirmEmail;
