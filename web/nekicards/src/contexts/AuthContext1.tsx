import React, { useEffect, useState, createContext, ReactNode } from "react";
import api from "../api";
import { Navigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, senha: string) => Promise<void>;
  signed: boolean;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadingStoredData = () => {
      const storageUser = localStorage.getItem("id");
      const storageToken = localStorage.getItem("token");

      if (storageUser && storageToken) {
        setUser({
          id: storageUser,
          email: "",
          token: storageToken,
        });
      }
    };
    loadingStoredData();
  }, []);

  const signIn = async (email: string, senha: string) => {
    try {
      const loginRequestData = {
        email: email,
        senha: senha,
      };
      const response = await api.post("/login", loginRequestData);
      if (response.data.error) {
        alert(response.data.error);
      } else {
        const userData = response.data;
        setUser(userData);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;
        localStorage.setItem("id", userData.id);
        localStorage.setItem("token", userData.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to={"/registrar"} />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signed: !!user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
