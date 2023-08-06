import Layout from "@/components/layout/Layout";
import { isAuthenticatedUser } from "@/utils/isAuthenticated";
import UpdateRecord from "@/components/record/UpdateRecord";

import axios from "axios";

export default function UpdateJobPage({
  record,
  access_token,
  error,
}: {
  record: any;
  access_token: any;
  error: any;
}) {
  // if (error?.includes("Not found")) return <NotFound />;

  return (
    <Layout title="Update Record" id="home">
      <UpdateRecord record={record} access_token={access_token} />
    </Layout>
  );
}

export async function getServerSideProps({
  req,
  params,
}: {
  req: any;
  params: { id: string };
}) {
  const access_token = req.cookies.access;
  const user = await isAuthenticatedUser(access_token);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(
      `${process.env.API_URL}/api/records/${params.id}/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const record = res.data;

    return {
      props: {
        record,
        access_token,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: error.response.data,
      },
    };
  }
}
