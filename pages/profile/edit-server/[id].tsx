import { NextPageWithLayout } from "../../_app";
import Head from "next/head";
import React from "react";
import Layout from "../../../components/common/layout/layout";
import { wrapper } from "../../../redux/store";
import { Api } from "../../../utils/api";
import { setUserData } from "../../../redux/slices/user";
import { isAxiosError } from "axios";
import { CreateServerDto, ServerResponseType } from "../../../utils/api/types";
import { EditServerSection } from "../../../sections/add-edit-server/edit-server-section";
import { setEditServerData } from "../../../redux/slices/server";

type EditServerType = {
  server: ServerResponseType;
};

const EditServer: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Edit server</title>
      </Head>
      <EditServerSection />
    </>
  );
};

EditServer.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout type={"full"}>{page}</Layout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { req } = ctx;
    const { id } = ctx.query;
    try {
      if (req.cookies?.Authentication && id) {
        const data = await Api(ctx).user.getMe();
        if (data?.email) {
          store.dispatch(setUserData(data));
        }
        let server;
        if (typeof id === "string") {
          server = data.servers?.find((item) => item.id === parseInt(id, 10));
        }
        if (server) {
          const serverData: CreateServerDto = {
            id: server.id,
            name: server.name,
            link: server.link,
            rates: server.rates,
            chronic: server.chronic?.slug ? server.chronic.slug : "",
            open_date: server.open_date
              ? new Date(server.open_date).toISOString()
              : new Date().toISOString(),
            serverTags:
              server.serverTags.length > 0
                ? server.serverTags.map((item) => item.slug)
                : [],
            server_type: server.server_type,
            cash_reward_text: server.cash_reward_text
              ? server.cash_reward_text
              : "",
            promotion_bonus_text: server.promotion_bonus_text
              ? server.promotion_bonus_text
              : "",
            bonus_for_newbies_text: server.bonus_for_newbies_text
              ? server.bonus_for_newbies_text
              : "",
            orders: server.orders,
          };
          store.dispatch(setEditServerData(serverData));

          return {
            props: { server },
          };
        } else {
          return {
            props: {},
            redirect: {
              destination: "/profile/servers",
              permanent: false,
            },
          };
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
  }
);

// Page itself is not connected to Redux Store, it has to render Provider to allow child components to connect to Redux Store

// you can also use Redux `useSelector` and other hooks instead of `connect()`
// export default connect((state: RootState) => state)(Index);
export default EditServer;
