import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../app/features/theme/themeSlice";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="fixed top-4 right-4 p-2 rounded-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-yellow-400 shadow-lg hover:scale-105 transition-transform"
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
