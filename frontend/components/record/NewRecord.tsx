import React, { useContext, useState, useEffect } from "react";
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

  const submitHandler = (e: any) => {
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
      <div className="form-wrapper2">
        <form onSubmit={submitHandler}>
          <table className="form-item2">
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
                    maxLength={200}
                    value={impression}
                    onChange={(e) => setImpression(e.target.value)}
                    required
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <div className="register-button">
                    <button type="submit" className="button">
                      Record
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div className="form-footer2"></div>
      </div>

      <div className="abtn footer-btn">
        <Link href="home/" className="abtn-c">
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
        </Link>
      </div>
    </>
  );
};

export default NewRecord;
