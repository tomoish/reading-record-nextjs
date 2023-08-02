import Layout from "@/components/layout/Layout";
import MyPage from "@/components/user/MyPage";

export default function Index() {
  return (
    <Layout title="home" id="home">
      <MyPage />
    </Layout>
  );
}
