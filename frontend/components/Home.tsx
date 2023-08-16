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
    login({ username: email, password });
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-black text-5xl font-bold my-4">
          Let's read a book!
        </h1>
        <p className="text-center text-black text-3xl">
          This website is for keeping your own reading records.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-48 my-20 lg:my-40 gap-y-14">
          <Link
            href="/register"
            className="text-center mx-32 lg:mx-24 md:mx-12 rounded-full p-4 bg-red-100 hover:bg-red-300 hover:text-white"
          >
            <span className="text-center text-3xl">Create Account</span>
          </Link>

          <div
            className="text-center mx-32 lg:mx-24 md:mx-12 rounded-full p-4 cursor-pointer bg-red-100 hover:bg-red-300 hover:text-white  text-black text-3xl"
            onClick={guestLoginHandler}
          >
            Guest user
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div className="main">
  //       <h1>Let's read a book!</h1>
  //       <p className="introduction">
  //         This website is for keeping your own reading records.
  //       </p>
  //       <div className="btn">
  //         <Link href="/register" className="btn-c">
  //           Create Account
  //         </Link>
  //       </div>

  //       <div className="btn">
  //         <div className="btn-c" onClick={guestLoginHandler}>
  //           Guest user
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Home;
