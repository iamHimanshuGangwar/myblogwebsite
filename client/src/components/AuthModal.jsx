import React from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignupModal";
import OTPModal from "./auth/OTPModal";

const AuthModal = () => {
  const { authModal, closeModal } = useAuth();

  if (!authModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-xl relative border border-gray-200 dark:border-gray-700">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute right-3 top-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {authModal === "login" && <LoginModal />}
        {authModal === "signup" && <SignupModal />}
        {authModal === "otp" && <OTPModal />}
      </div>
    </div>
  );
};

export default AuthModal;
