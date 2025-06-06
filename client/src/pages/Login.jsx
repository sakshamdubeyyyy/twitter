import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import AuthPage from "../components/shared/AuthPage";
import AuthForm from "../components/shared/AuthForm";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/home")
    }
  }, [])

  const { mutate, isLoading, error } = useMutation(loginUser, {
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      localStorage.setItem("token", JSON.stringify(data.token))
      localStorage.setItem("name", JSON.stringify(data.user.name))
      localStorage.setItem("user_id", JSON.stringify(data.user.user_id))
      toast.success("Logged in successfully!");
      navigate("/home");
    },
    onError:(error) => {
      toast.error(error.response.data.error)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  const fields = [
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
        title="Welcome Back"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        fields={fields}
        submitText={{
          default: "Login",
          loading: "Logging in...",
        }}
        footerText="Not a user?"
        footerLinkText="Register"
        footerLinkTo="/register"
      />
    </AuthPage>
  );
}
