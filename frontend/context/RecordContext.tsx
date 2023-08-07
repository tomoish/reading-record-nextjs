import axios from "axios";
import { useState, useEffect, createContext } from "react";

import { useRouter } from "next/router";

interface RecordContextType {
  loading: boolean;
  error: any;
  created: boolean;
  updated: boolean;
  deleted: boolean;
  newRecord: (data: any, access_token: string) => Promise<void>;
  updateRecord: (id: any, data: any, access_token: string) => Promise<void>;
  deleteRecord: (id: any, access_token: string) => Promise<void>;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  setCreated: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  clearErrors: () => void;
}

const RecordContext = createContext<RecordContextType>({
  loading: false,
  error: null,
  created: false,
  updated: false,
  deleted: false,
  newRecord: async (data: any, access_token: string) => {},
  updateRecord: async (id: any, data: any, access_token: string) => {},
  deleteRecord: async (id: any, access_token: string) => {},
  setUpdated: () => {},
  setCreated: () => {},
  setDeleted: () => {},
  clearErrors: () => {},
});

export const RecordProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  
  const router = useRouter();

  const newRecord = async (data:any, access_token:any) => {
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
    } catch (error: any) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const updateRecord = async (id: any, data: any, access_token: string) => {
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
    } catch (error: any) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const deleteRecord = async (id: any, access_token: string) => {
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
    } catch (error: any) {
      // console.log(error);
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
