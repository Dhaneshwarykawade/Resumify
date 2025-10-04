// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../components/Firebase2";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // 👈 state for eye toggle
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    if (!formData.email) {
      setError("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] px-4">
      <div className="w-full max-w-md bg-[#1e293b]/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-400 text-sm mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-white/20 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-[#f59e0b] outline-none placeholder-gray-400"
            required
          />

          {/* 🔹 Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white/20 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-[#2563eb] outline-none placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* ✅ Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-300">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 accent-[#f59e0b]"
              />
              Remember Me
            </label>

            {/* 🔹 Forgot Password */}
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[#22d3ee] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#f59e0b] to-[#2563eb] text-white rounded-lg font-semibold hover:scale-[1.02] transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 py-2 bg-[#ea4335] text-white rounded-lg font-semibold hover:bg-[#c5221f] transition"
        >
          Login with Google
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#f59e0b] hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
