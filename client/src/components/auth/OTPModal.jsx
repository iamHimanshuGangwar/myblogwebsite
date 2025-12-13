import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const OTPModal = () => {
  const { axios, tempUserId, openLogin, closeOTP } = useAuth();
  const [otp, setOtp] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!tempUserId) {
      return toast.error("No user ID found. Please register again.");
    }

    try {
      const { data } = await axios.post("/auth/verify-otp", {
        otp,
        userId: tempUserId,
      });

      if (!data?.success) {
        return toast.error(data?.message || "OTP verification failed");
      }

      toast.success("Account verified!");
      openLogin();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "OTP verification failed"
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50"
      >
        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md p-8 rounded-2xl relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-center"
        >
          {/* Close Button */}
          <button
            onClick={closeOTP}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X size={22} />
          </button>

          {/* Title */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Verify OTP
          </h2>

          {/* OTP Form */}
          <form onSubmit={submit} className="mt-6 space-y-5">
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="w-full text-center text-lg tracking-widest py-3 rounded-lg bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter 6-digit OTP"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
            >
              Verify OTP
            </button>
          </form>

          <p className="text-sm mt-4 text-white/90">
            Already verified?{" "}
            <span
              className="text-blue-300 cursor-pointer hover:underline"
              onClick={openLogin}
            >
              Login
            </span>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OTPModal;
