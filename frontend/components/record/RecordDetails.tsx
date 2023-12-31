import React, { useEffect, useContext } from "react";

import RecordContext from "@/context/RecordContext";
import RecordItem from "./RecordItem";
import Link from "next/link";

import { useRouter } from "next/router";
import { RecordType } from "@/types/RecordType";

const RecordDetails = ({
  record,
  access_token,
}: {
  record: RecordType;
  access_token: string;
}) => {
  const { clearErrors, error, loading, deleted, deleteRecord, setDeleted } =
    useContext(RecordContext);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      clearErrors();
    }

    if (deleted) {
      setDeleted(false);
      router.push("/my-records");
    }
  }, [error, deleted]);

  const deleteRecordHandler = (id: number) => {
    deleteRecord(id, access_token);
  };

  return (
    <>
      <div className="mt-20">
        <RecordItem key={record.id} record={record} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-20 gap-y-4 mt-12 px-12 lg:px-4">
        <Link
          href={`/record/update/${record.id}`}
          className="flex items-center justify-center mx-12 md:mx-40 lg:mx-0 xl:mx-12 rounded-full p-4 bg-red-100 hover:bg-red-300 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="m16.89 1.2l1.41 1.41c.39.39.39 1.02 0 1.41L14 8.33V18H3V3h10.67l1.8-1.8c.4-.39 1.03-.4 1.42 0zm-5.66 8.48l5.37-5.36l-1.42-1.42l-5.36 5.37l-.71 2.12z"
            />
          </svg>
          <span className="ml-2 text-lg">Correct a record</span>
        </Link>

        <div
          className="flex items-center justify-center mx-12 md:mx-40 lg:mx-0 xl:mx-12 rounded-full p-4 cursor-pointer bg-red-100 hover:bg-red-300 text-black hover:text-white"
          onClick={() => deleteRecordHandler(record.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"
            />
          </svg>
          <span className="ml-2 text-lg">Delete a record</span>
        </div>

        <Link
          href="/my-records"
          className="flex items-center justify-center mx-12 md:mx-40 lg:mx-0 xl:mx-12 rounded-full p-4 cursor-pointer bg-red-100 hover:bg-red-300 text-black hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 26 26"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M20 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1ZM4 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H4Zm2 5h2v2H6V7Zm5 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-3 4H6v2h2v-2Zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Zm-2 3H6v2h2v-2Zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2 text-lg">Back to the records</span>
        </Link>
      </div>
    </>
  );
};

export default RecordDetails;
