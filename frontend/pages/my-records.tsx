import { NextApiRequest } from "next";
import Layout from "@/components/layout/Layout";
import MyRecords from "@/components/record/MyRecord";
import { RecordType } from "@/types/RecordType";

import { isAuthenticatedUser } from "@/utils/isAuthenticated";
import axios from "axios";

export default function MyJobPage({ records }: { records: RecordType[] }) {

  return (
    <Layout title="My Records">
      <MyRecords records={records} />
    </Layout>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
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

  const res = await axios.get(`${process.env.API_URL}/api/me/records/`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const records = res.data;

  return {
    props: {
      records,
    },
  };
}
