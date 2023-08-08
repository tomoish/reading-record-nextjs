import Layout from "@/components/layout/Layout";
import RecordDetails from "@/components/record/RecordDetails";
import { RecordType } from "@/types/RecordType";

import { isAuthenticatedUser } from "@/utils/isAuthenticated";
import axios from "axios";

export default function JobDetailsPage({
  record,
  access_token,
  error,
}: {
  record: RecordType;
  access_token: string;
  error: any;
}) {

  if (error?.detail?.includes("Not found")) return <></>;
  else if (error?.message?.includes("You can not read this record"))
    return <></>;

  return (
    <Layout title={record.book_title} id="home">
      <RecordDetails record={record} access_token={access_token} />
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

  // console.log("params:", params);

  try {
    const res = await axios.get(
      `${process.env.API_URL}/api/records/${params.id}/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    // console.log(res.data);
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
