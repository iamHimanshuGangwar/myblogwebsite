import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authModal, setAuthModal] = useState(null); // "login" | "signup" | "otp"
  const [tempUserId, setTempUserId] = useState(null);

  const openLogin = () => setAuthModal("login");
  const openSignup = () => setAuthModal("signup");
  const openOTP = (id) => {
    setTempUserId(id);
    setAuthModal("otp");
  };
  const closeModal = () => setAuthModal(null);
  const closeSignup = () => setAuthModal(null);
  const closeOTP = () => {
    setAuthModal(null);
    setTempUserId(null);
  };

  const clientApiBase = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

  return (
    <AuthContext.Provider
      value={{
        authModal,
        tempUserId,
        openLogin,
        openSignup,
        openOTP,
        closeModal,
        closeSignup,
        closeOTP,
        axios: axios.create({ baseURL: `${clientApiBase}/api` }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
