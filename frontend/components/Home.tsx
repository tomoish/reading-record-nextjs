import React, { MouseEvent, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import AuthContext from "@/context/AuthContext";

const Home = () => {

  const email = `${process.env.guest_email}`;
  const password = `${process.env.guest_password}`;

  const router = useRouter();

  const { loading, error, isAuthenticated, login, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push("/home");
    }
  }, [isAuthenticated, loading]);

  const guestLoginHandler = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log(email, password);
    login({ username: email, password });
  };

  return (
    <div id="wrap">
      <div className="main">
        <h1>Let's read a book!</h1>
        <p className="introduction">
          This website is for keeping your own reading records.
        </p>
        <div className="btn">
          <Link href="/register" className="btn-c">
            Create Account
          </Link>
        </div>

        <div className="btn">
          <div className="btn-c" onClick={guestLoginHandler}>
            Guest user
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
