import axios from "axios";
import { useState, useEffect, createContext } from "react";

import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

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
        // loadUser();
        SetIsAuthenticated(true);
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
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
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        login,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
