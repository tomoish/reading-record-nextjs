import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { RecordProvider } from "@/context/RecordContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RecordProvider>
        <Component {...pageProps} />
      </RecordProvider>
    </AuthProvider>
  );
}
