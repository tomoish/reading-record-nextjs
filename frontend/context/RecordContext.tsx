import axios from "axios";
import { useState, useEffect, createContext } from "react";

import { useRouter } from "next/router";

const RecordContext = createContext();

export const RecordProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  
  const router = useRouter();

  const newRecord = async (data, access_token) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.API_URL}/api/records/new/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setCreated(true);
        router.push("/home");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const updateRecord = async (id, data, access_token) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${process.env.API_URL}/api/records/${id}/update/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setUpdated(true);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const deleteRecord = async (id, access_token) => {
    try {
      setLoading(true);

      const res = await axios.delete(
        `${process.env.API_URL}/api/records/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      setLoading(false);
      setDeleted(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <RecordContext.Provider
      value={{
        loading,
        error,
        created,
        updated,
        deleted,
        newRecord,
        updateRecord,
        deleteRecord,
        setUpdated,
        setCreated,
        setDeleted,
        clearErrors,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};

export default RecordContext;
