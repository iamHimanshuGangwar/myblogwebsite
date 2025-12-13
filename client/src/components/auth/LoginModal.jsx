import React, { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";

const LoginModal = () => {
  const { axios, openSignup, closeModal } = useAuth();
  const { setToken, setUser } = useAppContext();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);

  const updateField = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/auth/login", form);

      if (!data?.success) {
        return toast.error(data?.message || "Login failed");
      }

      setToken(data.token);
      setUser(data.user || null);
      toast.success("Login Successful!");

      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed"
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
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md p-8 rounded-2xl relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X size={22} />
          </button>

          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Login
          </h2>

          <form onSubmit={submit} className="mt-6 space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-200 w-5 h-5" />
              <input
                name="email"
                type="email"
                onChange={updateField}
                required
                placeholder="Enter email"
                className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-200 w-5 h-5" />
              <input
                name="password"
                type={showPass ? "text" : "password"}
                onChange={updateField}
                required
                placeholder="••••••"
                className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Show / Hide Password */}
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-gray-200 cursor-pointer"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-white/90">
            Don't have an account?{" "}
            <span
              className="text-blue-300 cursor-pointer hover:underline"
              onClick={openSignup}
            >
              Sign up
            </span>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
