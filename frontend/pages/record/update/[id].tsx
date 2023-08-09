import { NextApiRequest } from "next";
import Layout from "@/components/layout/Layout";
import { isAuthenticatedUser } from "@/utils/isAuthenticated";
import UpdateRecord from "@/components/record/UpdateRecord";

import axios, { AxiosError } from "axios";
import { RecordType } from "@/types/RecordType";

export default function UpdateJobPage({
  record,
  access_token,
  error,
}: {
  record: RecordType;
  access_token: string;
  error: Error | AxiosError;
}) {

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
  req: NextApiRequest;
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
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        props: {
          error: error.response.data,
        },
      };
    } else if (error instanceof Error) {
      return {
        props: {
          error: error.message,
        },
      };
    }
  }
}
