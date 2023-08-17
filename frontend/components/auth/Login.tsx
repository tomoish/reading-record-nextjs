import React, { FormEvent, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import AuthContext from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { loading, error, isAuthenticated, login, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push("/home");
    }
  }, [isAuthenticated, loading]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(email, password);
    login({ username: email, password });
  };

  return (
    <div className="bg-gray-200 w-1/2 lg:w-1/3 xl:w-1/4 mx-auto mt-10 p-2 text-center">
      <Link href="/" className="text-center mt-4 mx-auto w-full">
        <Image
          src="/images/logo.png"
          alt="HOME"
          width="151"
          height="60"
          className="mx-auto my-4"
        />
      </Link>

      <h1 className="text-center text-black font-bold text-3xl my-2">
        Sign In
      </h1>
      <form action="/send-data-here" method="post" onSubmit={submitHandler}>
        <div className="my-6">
          {/* <label className="block mb-2 text-sm font-medium text-black ">
            Username
          </label> */}
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="\S+@\S+\.\S+"
            title="Your email is invalid"
            required
          />
        </div>
        <div className="mb-6">
          {/* <label className="block mb-2 text-sm font-medium text-black ">
            Password
          </label> */}
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="text-black hover:text-white bg-red-300 hover:bg-red-500 font-medium rounded-lg text-xl sm:w-3/5 px-5 py-2.5 text-center "
        >
          Sign In
        </button>
        <br></br>
      </form>

      <div className="text-center text-base py-4 hover:underline">
        <p>
          <Link href="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
