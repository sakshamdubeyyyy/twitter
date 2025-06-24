import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import MakePost from "./components/MakePost";

function App() {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/makePost"
          element={
            <PrivateRoute>
              <MakePost />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
