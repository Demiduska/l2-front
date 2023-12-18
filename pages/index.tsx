import type { NextPageWithLayout } from "./_app";
import React from "react";
import Layout from "../components/common/layout/layout";
import Head from "next/head";
import { HeadBanner } from "../sections/head-banner/head-banner";
import { wrapper, RootState } from "../redux/store";
import { ServersSection } from "../sections/servers/servers-section";
import { connect } from "react-redux";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";
import axios, { isAxiosError } from "axios";
import {
  AllServersType,
  BannerType,
  FilterItemType,
  FilterType,
  ResponseServers,
  SelectServer,
  ServersType,
} from "../utils/api/types";

import banner from "/public/images/head-banner.png";
import bannerDefault from "../public/images/adv-back.png";
import telDefault from "../public/images/tel-back.png";
import useSWR, { Fetcher } from "swr";
import { format } from "date-fns";

const filterChronics: FilterItemType[] = [
  { title: "Interlude", value: 1, count: 234 },
  { title: "High Five", value: 2, count: 139 },
  { title: "С4", value: 3, count: 28 },
  { title: "Epilogue", value: 4, count: 22 },
  { title: "Epilogue 1", value: 5, count: 222 },
];

const filterratess: FilterItemType[] = [
  { title: "x1-10", value: 1 },
  { title: "x10-100", value: 2 },
  { title: "x100-500", value: 3 },
  { title: "x500-1000", value: 4 },
  { title: "x1000-5000", value: 5 },
];

const filterTypes: FilterItemType[] = [
  { title: "top servers", value: 1 },
  { title: "custom", value: 2 },
  { title: "PVP", value: 3 },
  { title: "RVR", value: 4 },
  { title: "multicraft", value: 5 },
  { title: "bonus", value: 6 },
  { title: "multiprof", value: 7 },
  { title: "obt", value: 8 },
];

const filters: FilterType[] = [
  {
    title: "хроники",
    nameField: "chronics",
    itemWidth: 100,
    showAllText: "Все хроники",
    items: filterChronics,
    showItems: 4,
  },
  {
    title: "рейты",
    nameField: "ratess",
    itemWidth: 50,
    showAllText: "Все рейты",
    items: filterratess,
    showItems: 4,
  },
  {
    title: "типы серверов",
    nameField: "types",
    itemWidth: 50,
    items: filterTypes,
  },
];

const banner_1: BannerType = {
  link: "/advertising",
  type: "default",
  view: 1,
  image: bannerDefault,
  buttonText: "Реклама на сайте",
};

const banner_2: BannerType = {
  link: "/advertising",
  type: "default",
  view: 2,
  image: telDefault,
  buttonText: "Присоединиться",
};

const Index: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Main</title>
      </Head>
      <HeadBanner title={"banner"} link={""} image={banner} />
      <ServersSection
        title={
          "Анонсер игровых серверов <span class='text-blue'>Lineage II</span>"
        }
        filters={filters}
        banner_1={banner_1}
        banner_2={banner_2}
      />
    </>
  );
};

Index.getLayout = function getLayout(page: React.ReactElement) {
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

// Page itself is not connected to Redux Store, it has to render Provider to allow child components to connect to Redux Store

// you can also use Redux `useSelector` and other hooks instead of `connect()`
// export default connect((state: RootState) => state)(Index);
export default Index;
