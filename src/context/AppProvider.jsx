import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [result, setResult] = useState(null); // null | "success" | "error"
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("night");

  useEffect(() => {
    const handleThemePreference = () => {
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        localStorage.setItem("theme", theme);
      }
    };
    handleThemePreference();
  }, []);

  return (
    <AppContext.Provider
      value={{ result, setResult, message, setMessage, theme, setTheme }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
