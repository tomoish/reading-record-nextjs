import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

const Header = () => {
  const { loading, user } = useContext(AuthContext);

  return (
    <div className="p-2 bg-red-100">
      <div className="container flex mx-auto justify-between flex-col md:flex-row items-center">
        <div className="mb-3 md:mb-0">
          <Image src="/images/logo.png" alt="HOME" width="131" height="52" priority/>
        </div>

        {user ? (
          <div>
            <Link href="/home" className="flex rounded-full p-2 hover:bg-red-300 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="6" r="4" />
                  <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" />
                </g>
              </svg>
              <span className="text-lg font-bold">{`${user.first_name}`}</span>
              
            </Link>
          </div>
        ) : (
          !loading && (
            <div>
              <Link href="/login" className="flex rounded-full p-2 hover:bg-red-300 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="currentColor"
                    d="M28 4H12a2 2 0 0 0-2 2v7h8.5l-3.38-3.29a1 1 0 0 1 1.41-1.41l5.79 5.79l-5.79 5.79a1 1 0 0 1-1.41-1.41L18.5 15H10v15a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
                    className="clr-i-solid clr-i-solid-path-1"
                  />
                  <path
                    fill="currentColor"
                    d="M10 13H4a1 1 0 0 0-1 1a1 1 0 0 0 1 1h6Z"
                    className="clr-i-solid clr-i-solid-path-2"
                  />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
                <span className="text-lg font-bold">Sign in</span>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
