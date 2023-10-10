import { createContext, ReactNode, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";

interface AuthContextData {
  token: string | null;
  login: (email: string, senha: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post("/login", { email, senha });
      if (response.status === 200) {
        const { token } = response.data;
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log("TOKEN AUTHCONTEXT", token);
        const userData = response.data;
        setToken(userData);
        await AsyncStorage.setItem("token", token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
