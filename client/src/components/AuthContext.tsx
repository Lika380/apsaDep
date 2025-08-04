import React, { createContext, useState, useEffect, ReactNode } from "react";
import { tokenUtils } from "../utils/api";

interface User {
  id: number;
  email: string;
  role: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = tokenUtils.getToken();
    if (token && tokenUtils.isTokenValid()) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          id: payload.id,
          email: payload.uemail,
          role: payload.role,
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Ошибка при разборе токена:", error);
        tokenUtils.removeToken();
      }
    }
  }, []);

  const login = (token: string, userData: User) => {
    tokenUtils.setToken(token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    tokenUtils.removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
