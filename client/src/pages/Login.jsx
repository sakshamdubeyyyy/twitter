import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/features/auth/authSlice";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [hovering, setHovering] = useState(false);
  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const background = useTransform(
    [x, y],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX}px ${latestY}px, #A7F3D0, #F0FDF4)`
  );

  const staticBackground = `radial-gradient(circle at center, #A7F3D0, #F0FDF4)`;

  const { mutate, isLoading, error } = useMutation(loginUser, {
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      alert("Logged in successfully");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center transition-colors duration-300 relative px-4"
      style={{
        background: hovering ? background : staticBackground,
        transition: "background 0.3s ease",
      }}
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6 border border-teal-100"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-700">
          Welcome Back
        </h2>

        <input
          className="w-full p-3 border border-teal-300 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="w-full p-3 border border-teal-300 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center text-sm text-gray-600">
          Not a user?{" "}
          <Link
            to="/register"
            className="text-teal-500 font-medium hover:underline"
          >
            Register
          </Link>
        </div>

        {error && (
          <p className="text-red-500 text-center text-sm">
            {error.response?.data?.message || "Login failed"}
          </p>
        )}
      </form>
    </motion.div>
  );
}
