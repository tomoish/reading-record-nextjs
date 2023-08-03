import Layout from "@/components/layout/Layout";
import MyRecords from "@/components/record/MyRecord";

import { isAuthenticatedUser } from "@/utils/isAuthenticated";
import axios from "axios";

export default function MyJobPage({ records, access_token }) {
  const className = `${records.length !== 0 ? "my-records" : "home"}`;

  return (
    <Layout title="My Records" id={className}>
      <MyRecords records={records} access_token={access_token} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
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
      access_token,
    },
  };
}
