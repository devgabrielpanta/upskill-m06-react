import { useApp } from "../context/AppProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeController() {
  const { theme, setTheme } = useApp();

  const toggleTheme = () => {
    const newTheme = theme === "night" ? "nord" : "night";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <label className="flex cursor-pointer gap-2">
      <Sun size={20} />
      <input
        type="checkbox"
        checked={theme === "night"}
        onChange={toggleTheme}
        className="toggle theme-controller"
      />
      <Moon size={20} />
    </label>
  );
}
