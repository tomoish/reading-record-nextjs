import React, { FormEvent, useContext, useState, useEffect } from "react";
import Link from "next/link";

import RecordContext from "@/context/RecordContext";

const NewRecord = ({ access_token }: { access_token: string }) => {
  const [bookTitle, setBookTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [date, setDate] = useState("");
  const [firstPage, setFirstPage] = useState("");
  const [finalPage, setFinalPage] = useState("");
  const [impression, setImpression] = useState("");

  const { clearErrors, error, loading, created, newRecord, setCreated } =
    useContext(RecordContext);

  useEffect(() => {
    if (error) {
      clearErrors();
    }

    if (created) {
      setCreated(false);
    }
  }, [error, created]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      book_title: bookTitle,
      isbn,
      date,
      first_page: firstPage,
      final_page: finalPage,
      impression,
    };

    newRecord(data, access_token);
  };

  return (
    <>
      <div className="bg-gray-100 w-2/3 md:w-2/5 xl:w-1/3 mx-auto mt-6 p-4 text-center text-gray-900">
        <form onSubmit={submitHandler}>
          <table className="mx-auto [&_input]:h-12 [&_input]:w-4/5 [&_input]:bg-gray-100 [&_input]:border-b-2 focus:[&_input]:border-gray-600 focus:[&_input]:outline-0 focus:[&_textarea]:outline-none">
            <tbody>
              <tr>
                <th>
                  <label>book_title:</label>
                </th>
                <td>
                  <input
                    type="text"
                    maxLength={100}
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label>isbn (optional):</label>
                </th>
                <td>
                  <input
                    type="text"
                    maxLength={13}
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label>date:</label>
                </th>
                <td>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label>first page:</label>
                </th>
                <td>
                  <input
                    type="number"
                    value={firstPage}
                    onChange={(e) => setFirstPage(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label>final page:</label>
                </th>
                <td>
                  <input
                    type="number"
                    value={finalPage}
                    onChange={(e) => setFinalPage(e.target.value)}
                    required
                  />
                </td>
              </tr>

              <tr>
                <th>
                  <label>impression:</label>
                </th>
                <td>
                  <textarea
                    cols={40}
                    rows={10}
                    maxLength={100}
                    value={impression}
                    onChange={(e) => setImpression(e.target.value)}
                    className="h-32 w-4/5 mt-4"
                    required
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="submit"
            className="mt-4 mb-0 text-black hover:text-white bg-red-300 hover:bg-red-500 font-medium rounded-lg text-xl sm:w-3/5 px-5 py-2.5 text-center "
          >
            Record
          </button>
        </form>
      </div>

      <Link
        href="home/"
        className="flex justify-center items-center rounded-full w-3/5 md:w-1/3 xl:w-1/4 m-auto mt-8 p-4 bg-red-100 hover:bg-red-300 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="m2.87 7.75l1.97 1.97a.75.75 0 1 1-1.06 1.06L.53 7.53L0 7l.53-.53l3.25-3.25a.75.75 0 0 1 1.06 1.06L2.87 6.25h9.88a3.25 3.25 0 0 1 0 6.5h-2a.75.75 0 0 1 0-1.5h2a1.75 1.75 0 1 0 0-3.5H2.87Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-4 text-lg">Back to my page</span>
      </Link>
    </>
  );
};

export default NewRecord;
