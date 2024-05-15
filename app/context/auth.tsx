"use client";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import apiClient from "../lib/apiClient";
import { ProfileType } from "../types";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: null | {
    id: number;
    email: string;
    username: string;
    profile: ProfileType;
  };
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
    profile: ProfileType;
  }>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

    apiClient.get("/users/find").then((res) => {
      setUser(res.data.user);
    });
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

    apiClient.get("/users/find").then((res) => {
      setUser(res.data.user);
    });
  };
  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    delete apiClient.defaults.headers["Authrization"];
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
