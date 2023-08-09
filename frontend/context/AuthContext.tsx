import axios, { AxiosError } from "axios";
import { useState, useEffect, createContext } from "react";

import { useRouter } from "next/router";
import { AccountType } from "@/types/AccountType";

type AuthContextType = {
  loading: boolean;
  user: AccountType | null;
  isAuthenticated: boolean;
  error: Error | AxiosError | null | undefined;
  login: (data: { username: string; password: string }) => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  clearErrors: () => void;
};

const AuthContext = createContext<AuthContextType>({
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {},
  register: async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {},
  logout: async () => {},
  clearErrors: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user]);

  // Login user
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        loadUser();
        SetIsAuthenticated(true);
        setLoading(false);
        router.push("/home");
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

  const register = async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);

      const res = await axios.post(`${process.env.API_URL}/api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      if (res.data.message) {
        setLoading(false);
        router.push("/login");
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

  const loadUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/auth/user");

      if (res.data.user) {
        SetIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      }
    } catch (error) {
      setLoading(false);
      SetIsAuthenticated(false);
      setUser(null);
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response &&
            (error.response.data.detail || error.response.data.error)
        );
      }
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");

      if (res.data.success) {
        SetIsAuthenticated(false);
        setUser(null);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      SetIsAuthenticated(false);
      setUser(null);
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
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
