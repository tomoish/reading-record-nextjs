import axios, { AxiosError } from "axios";
import { useState, useEffect, createContext } from "react";

import { useRouter } from "next/router";
import { SubmissionRecordType } from "@/types/RecordType";

interface RecordContextType {
  loading: boolean;
  error: Error | AxiosError | null | undefined;
  created: boolean;
  updated: boolean;
  deleted: boolean;
  newRecord: (
    data: SubmissionRecordType,
    access_token: string
  ) => Promise<void>;
  updateRecord: (
    id: number,
    data: SubmissionRecordType,
    access_token: string
  ) => Promise<void>;
  deleteRecord: (id: number, access_token: string) => Promise<void>;
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
  newRecord: async (data: SubmissionRecordType, access_token: string) => {},
  updateRecord: async (
    id: number,
    data: SubmissionRecordType,
    access_token: string
  ) => {},
  deleteRecord: async (id: number, access_token: string) => {},
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

  const newRecord = async (
    data: SubmissionRecordType,
    access_token: string
  ) => {
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
        router.push("/my-records");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response &&
            (error.response.data.detail || error.response.data.error)
        );
      }
    }
  };

  const updateRecord = async (
    id: number,
    data: SubmissionRecordType,
    access_token: string
  ) => {
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
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response &&
            (error.response.data.detail || error.response.data.error)
        );
      }
    }
  };

  const deleteRecord = async (id: number, access_token: string) => {
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
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response &&
            (error.response.data.detail || error.response.data.error)
        );
      }
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
