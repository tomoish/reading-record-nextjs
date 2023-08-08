import { NextApiRequest } from "next";
import Layout from "@/components/layout/Layout";
import NewRecord from "@/components/record/NewRecord";

import { isAuthenticatedUser } from "@/utils/isAuthenticated";

export default function NewJobPage({ access_token }: { access_token: string }) {
  return (
    <Layout title="Post a new Job" id="record-create">
      <NewRecord access_token={access_token} />
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

  return {
    props: {
      access_token,
    },
  };
}
