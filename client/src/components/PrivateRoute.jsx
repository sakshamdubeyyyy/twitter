import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
