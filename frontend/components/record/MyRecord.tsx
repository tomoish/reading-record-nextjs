import React, { useContext, useEffect } from "react";
import RecordItem from "./RecordItem";

import RecordContext from "@/context/RecordContext";
import { useRouter } from "next/router";

import { RecordType } from "@/types/RecordType";
import Link from "next/link";

const MyRecords = ({ records }: { records: RecordType[] }) => {
  const { clearErrors, error, loading, deleted } = useContext(RecordContext);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      clearErrors();
    }
  }, [error, deleted]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 mt-12 md:px-12">
        <div className="mt-4 text-center items-center">
          <Link
            href="/record-create/"
            className="flex justify-center rounded-full mx-16 md:mx-8 lg:mx-24 xl:mx-32 2xl:mx-40 p-4 bg-red-100 hover:bg-red-300 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
            <span className="ml-2">Post a record</span>
          </Link>
        </div>
        <div className="mt-4 text-center items-center">
          <Link
            href="/home"
            className="flex justify-center rounded-full mx-16 md:mx-8 lg:mx-24 xl:mx-32 2xl:mx-40 p-4 bg-red-100 hover:bg-red-300 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="m2.87 7.75l1.97 1.97a.75.75 0 1 1-1.06 1.06L.53 7.53L0 7l.53-.53l3.25-3.25a.75.75 0 0 1 1.06 1.06L2.87 6.25h9.88a3.25 3.25 0 0 1 0 6.5h-2a.75.75 0 0 1 0-1.5h2a1.75 1.75 0 1 0 0-3.5H2.87Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">Back to my page</span>
          </Link>
        </div>
      </div>

      <div className="mt-20">
        {records &&
          records.map((record: RecordType) => (
            <RecordItem key={record.id} record={record} />
          ))}
      </div>
      <br />
    </>
  );
};

export default MyRecords;
