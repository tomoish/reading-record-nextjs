import React, { FormEvent, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import AuthContext from "@/context/AuthContext";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { loading, error, isAuthenticated, register, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      clearErrors();
    }

    if (isAuthenticated && !loading) {
      router.push("/");
    }
  }, [isAuthenticated, error, loading]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(email, password);
    register({ firstName, lastName, email, password });
  };

  return (
    <div className="form-wrapper">
      <div className="login-logo">
        <Image src="/images/logo.png" alt="HOME" width="151" height="60" />
      </div>

      <h1>Sign Up</h1>

      <div className="reg">
        <form action="/send-data-here" method="post" onSubmit={submitHandler}>
          <table className="form-item">
            <tbody>
              <tr>
                <th>
                  <label>First Name:</label>
                </th>
                <td>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label>Last Name:</label>
                </th>
                <td>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label>Email:</label>
                </th>
                <td>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    minLength={6}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td></td>
                <td>
                  <div className="register-button">
                    <button type="submit" className="button">
                      Register
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        {/* <table className="form-item">
          <form method="post">
            <tr>
              <td></td>
              <td>
                <div className="register-button">
                  <input
                    type="submit"
                    className="button"
                    title="Register"
                    value="Register"
                  ></input>
                </div>
              </td>
            </tr>
          </form>
        </table> */}
      </div>

      <div className="form-footer">
        <p>
          <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
