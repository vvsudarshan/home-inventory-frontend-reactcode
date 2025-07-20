// src/context/AuthContext.jsx
import { createContext, useState } from "react";
import { login, register } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    const data = await login(email, password);
    if (data.token) {
      setUser(data.user);
      localStorage.setItem("token", data.token);
    }
    return data;
  };

  const handleRegister = async (name, email, password) => {
    const data = await register(name, email, password);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
