import Head from "next/head";
import HeroForm from "../sections/hero/HeroForm";
import { LoginForm } from "../components/common/auth-forms/forms/LoginForm";
import React from "react";
import Layout from "../components/common/layout/layout";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";
import { isAxiosError } from "axios";

function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <HeroForm>
        <LoginForm type={"page"} />
      </HeroForm>
    </>
  );
}

Login.getLayout = function getLayout(page: React.ReactElement) {
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

export default Login;
