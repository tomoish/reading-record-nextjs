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
    <div className="form-wrapper">
      <Link href="/" className="login-logo">
        <Image src="/images/logo.png" alt="HOME" width="151" height="60" />
      </Link>

      <h1>Sign In</h1>
      <form action="/send-data-here" method="post" onSubmit={submitHandler}>
        <table className="form-item">
          <tbody>
            <tr>
              <th>
                <label>Username:</label>
              </th>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="\S+@\S+\.\S+"
                  title="Your email is invalid"
                  required
                />
              </td>
            </tr>

            <tr>
              <th>
                <label>Password:</label>
              </th>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <div className="register-button">
                  <button type="submit" className="button">
                    Sign In
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="form-footer">
        <p>
          <Link href="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
