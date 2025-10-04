// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../components/Firebase2";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react"; // 👁️ import icons

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] px-4">
      <div className="w-full max-w-md bg-[#1e293b]/70 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent">
          Create an Account
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-white/20 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-[#22d3ee] outline-none placeholder-gray-400"
            required
          />
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

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#f59e0b] to-[#2563eb] text-white rounded-lg font-semibold hover:scale-[1.02] transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="w-full mt-4 py-2 bg-[#ea4335] text-white rounded-lg font-semibold hover:bg-[#c5221f] transition"
        >
          Sign up with Google
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#f59e0b] hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
