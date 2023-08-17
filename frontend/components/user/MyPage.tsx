import React, { useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

const MyPage = () => {
  const { loading, user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <div>
      {user ? (
        <h1 className="text-center text-black text-3xl font-bold my-4">
          {`${user.first_name}`}, welcome!
        </h1>
      ) : (
        <h1>Loading...</h1>
      )}

      <div className="grid grid-cols-1 h-52 md:grid-cols-2 md:gap-16 gap-y-14 mt-16">
        <div className="">
          <Link
            href="/record-create"
            className="flex flex-col text-center h-52 mx-16 lg:mx-32 justify-center items-center rounded-2xl p-4 bg-red-100 hover:bg-red-300 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 14 14"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5.5 12.5a2.72 2.72 0 0 0 0-4a2.72 2.72 0 0 0-4 0c-1 1-1 5-1 5s4 0 5-1Z" />
                <path d="M12.92 1.08a2 2 0 0 0-2.64-.15L4.5 5l-.71 2.64a2.87 2.87 0 0 1 1.71.86a2.87 2.87 0 0 1 .86 1.71L9 9.5l4.07-5.78a2 2 0 0 0-.15-2.64ZM.5 13.5l3.25-3.25" />
              </g>
            </svg>
            <br />
            <span className="text-center text-2xl">Post a record</span>
          </Link>
        </div>

        <div className="">
          <Link
            href="/my-records"
            className="flex flex-col text-center h-52 mx-16 lg:mx-32 justify-center items-center rounded-2xl p-4 bg-red-100 hover:bg-red-300 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M20 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1ZM4 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H4Zm2 5h2v2H6V7Zm5 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-3 4H6v2h2v-2Zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Zm-2 3H6v2h2v-2Zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
              />
            </svg>
            <br />
            <span className="text-center text-2xl">See the records</span>
          </Link>
        </div>

        <div className="md:col-span-2 md:w-1/5 lg:w-1/6 text-center mt-8 mx-auto">
          <Link
            href="/"
            className="flex text-center justify-center items-center rounded-full p-4 bg-red-100 hover:bg-red-300 hover:text-white"
            onClick={logoutHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="-1 -1 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H6zm10.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L18.586 13H10a1 1 0 1 1 0-2h8.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-center text-2xl ml-1">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
