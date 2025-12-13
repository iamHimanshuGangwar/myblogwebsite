import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Lock, Eye, EyeOff, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SignupModal = () => {
  const { axios, openLogin, openOTP, closeSignup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // LIVE PASSWORD VALIDATION
  const validations = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
    match: form.confirm !== "" && form.password === form.confirm,
  };

  const ValidationItem = ({ label, ok }) => (
    <p className={`flex items-center gap-2 text-sm ${ok ? "text-green-400" : "text-red-400"}`}>
      <Check
        size={18}
        className={`${ok ? "opacity-100" : "opacity-40"}`}
      />
      {label}
    </p>
  );

  const validatePassword = (password) => {
    if (!/.{8,}/.test(password)) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain a number";
    if (!/[^A-Za-z0-9]/.test(password)) return "Password must contain a special character";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();

    // Validate password
    const pwdError = validatePassword(form.password);
    if (pwdError) return toast.error(pwdError);

    if (form.password !== form.confirm)
      return toast.error("Passwords do not match");

    setLoading(true);

    try {
      const { data } = await axios.post("/auth/register", {
        name: form.name,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
      });

      if (!data?.success)
        return toast.error(data?.message || "Registration failed");

      toast.success("OTP sent!");
      openOTP(data.userId);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
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
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-md p-8 rounded-2xl relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
        >
          {/* Close Button */}
          <button
            onClick={closeSignup}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X size={22} />
          </button>

          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Create Account
          </h2>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-white/90">Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 text-gray-200 w-5 h-5" />
                <input
                  name="name"
                  onChange={updateField}
                  required
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-semibold text-white/90">
                Last Name
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 text-gray-200 w-5 h-5" />
                <input
                  name="lastname"
                  onChange={updateField}
                  required
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-white/90">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 text-gray-200 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  onChange={updateField}
                  required
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-white/90">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 text-gray-200 w-5 h-5" />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  onChange={updateField}
                  required
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="••••••"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-gray-200 cursor-pointer"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              {/* LIVE PASSWORD CHECK */}
              <div className="mt-3 space-y-1 bg-white/10 p-3 rounded-lg border border-white/20">
                <ValidationItem label="At least 8 characters" ok={validations.length} />
                <ValidationItem label="One uppercase letter" ok={validations.uppercase} />
                <ValidationItem label="One lowercase letter" ok={validations.lowercase} />
                <ValidationItem label="One number (0-9)" ok={validations.number} />
                <ValidationItem label="One special character" ok={validations.special} />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-white/90">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 text-gray-200 w-5 h-5" />
                <input
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  onChange={updateField}
                  required
                  className="w-full pl-10 pr-12 py-2.5 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="••••••"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-200 cursor-pointer"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              {/* CONFIRM MATCH CHECK */}
              {form.confirm.length > 0 && (
                <div className="mt-2">
                  <p
                    className={`text-sm flex items-center gap-2 ${
                      validations.match ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    <Check size={18} />
                    {validations.match
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-white/90">
            Already have an account?{" "}
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

export default SignupModal;
