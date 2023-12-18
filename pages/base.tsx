import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import React from "react";
import Layout from "../components/common/layout/layout";
import { Container } from "../components/common/container/container";

const AddServer: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>База Знаний</title>
      </Head>
      <section className={"pt-100 pb-100"}>
        <Container>База Знаний</Container>
      </section>
    </>
  );
};

AddServer.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout type={"full"}>{page}</Layout>;
};

export default AddServer;
