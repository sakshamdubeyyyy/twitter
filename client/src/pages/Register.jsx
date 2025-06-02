import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/features/auth/authSlice";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();

  const { mutate, isLoading, error } = useMutation(registerUser, {
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      alert("Registered successfully");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" disabled={isLoading}>
        Register
      </button>
      {error && <p>{error.response?.data?.message || "Error"}</p>}
    </form>
  );
}
