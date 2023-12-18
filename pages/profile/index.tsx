import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import React from "react";
import { wrapper } from "../../redux/store";
import { Api } from "../../utils/api";
import { setUserData } from "../../redux/slices/user";
import { isAxiosError } from "axios";
import ProfileSection from "../../sections/profile/profile-section";
import Layout from "../../components/common/layout/layout";
import { ProfileEdit } from "../../components/profile/edit/profile-edit";

const Profile: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <ProfileSection />
      <ProfileEdit />
    </>
  );
};

Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout type={"full"}>{page}</Layout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { req } = ctx;
    try {
      if (req.cookies?.Authentication) {
        const data = await Api(ctx).user.getMe();
        if (data?.email) {
          store.dispatch(setUserData(data));
        }
      } else {
        return {
          props: {},
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response?.data.message);
      }
      return {
        props: {},
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  }
);

export default Profile;
