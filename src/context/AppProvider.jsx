import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [result, setResult] = useState(null); // null | "success" | "error"
  const [message, setMessage] = useState("");

  return (
    <AppContext.Provider value={{ result, setResult, message, setMessage }}>
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
