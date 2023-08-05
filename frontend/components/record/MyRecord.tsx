import React, { useContext, useEffect } from "react";
import RecordItem from "./RecordItem";

import RecordContext from "@/context/RecordContext";
import { useRouter } from "next/router";

const MyRecords = ({
  records,
  access_token,
}: {
  records: any;
  access_token: any;
}) => {
  const { clearErrors, error, loading, deleted, deleteRecord, setDeleted } =
    useContext(RecordContext);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      clearErrors();
    }

    // if (deleted) {
    //   setDeleted(false);
    //   router.reload(router.asPath);
    // }
  }, [error, deleted]);

  // const deleteRecordHandler = (id) => {
  //   deleteRecord(id, access_token);
  // };

  return (
    <>
      <div className="my-page">
        <div className="abtn">
          <a href="/record-create/" className="abtn-c">
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
            Post a record
          </a>
        </div>
        <div className="abtn">
          <a href="/home" className="abtn-c">
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
            Back to my page
          </a>
        </div>
      </div>

      <div className="main show_records">

        {records &&
          records.map((record: any) => (
            <RecordItem key={record.id} record={record} />
          ))}
      </div>
      <br />
    </>
  );
};

export default MyRecords;
