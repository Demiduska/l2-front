import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import React from "react";
import Layout from "../components/common/layout/layout";
import { Container } from "../components/common/container/container";

const Advertising: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Advertising</title>
      </Head>
      <section className={"pt-100 pb-100"}>
        <Container>Advertising</Container>
      </section>
    </>
  );
};

Advertising.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout type={"full"}>{page}</Layout>;
};

export default Advertising;
