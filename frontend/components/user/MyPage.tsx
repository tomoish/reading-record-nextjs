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
      {user ? <h1>{`${user.first_name}`}, welcome!</h1> : <h1>Loading...</h1>}

      <div className="my-page">
        <div className="my-page-box">
          <Link href="/record-create" className="btn-my-page">
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
            Post a record
          </Link>
        </div>
        <div className="my-page-box">
          <Link href="/show-records" className="btn-my-page">
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
            See the records
          </Link>
        </div>
      </div>

      <div className="btn">
        <Link href="/" className="btn-c" onClick={logoutHandler}>
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
          Logout
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
