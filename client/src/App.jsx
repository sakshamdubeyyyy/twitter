import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle";

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
      </Routes>
    </Router>
    // <>
    //   <ThemeToggle />
    //   <div className="font-bold text-red-400 dark:text-green-500">Hello</div>
    // </>
  );
}

export default App;
