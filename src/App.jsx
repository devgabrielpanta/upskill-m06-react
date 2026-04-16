import TransactionsProvider from "./context/TransactionsProvider";
import AppProvider from "./context/AppProvider";
import { Routes, Route } from "react-router";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

export default function App() {
  return (
    <AppProvider>
      <TransactionsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Routes>
      </TransactionsProvider>
    </AppProvider>
  );
}
