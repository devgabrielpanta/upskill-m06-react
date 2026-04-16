import { useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeController() {
  const [theme, setTheme] = useState("night");

  const toggleTheme = () => {
    const newTheme = theme === "night" ? "emerald" : "night";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
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
