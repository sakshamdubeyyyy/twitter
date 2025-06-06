import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import AuthPage from "../components/shared/AuthPage";
import AuthForm from "../components/shared/AuthForm";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(registerUser, {
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      toast.success("Registered successfully");
      navigate("/");
    },
    onError:(error)=>{
      toast.error(error.response.data.error)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      onChange: (e) => setForm({ ...form, name: e.target.value }),
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      onChange: (e) => setForm({ ...form, email: e.target.value }),
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      onChange: (e) => setForm({ ...form, password: e.target.value }),
    },
  ];

  return (
    <AuthPage>
      <AuthForm
        title="Create Account"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        fields={fields}
        submitText={{
          default: "Register",
          loading: "Creating account...",
        }}
        footerText="Already have an account?"
        footerLinkText="Login"
        footerLinkTo="/"
      />
    </AuthPage>
  );
}
