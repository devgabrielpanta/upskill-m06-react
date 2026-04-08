import Header from "./components/Header";
import Feedback from "./components/Feedback";
import Loading from "./components/Loading";
import TransactionsProvider from "./context/TransactionsProvider";
import { Routes, Route } from "react-router";
import Transactions from "./pages/Transactions";
import Home from "./pages/Home";
import TransactionsForm from "./components/TransactionsForm";
import Layout from "./pages/Layout";

export default function App() {
  return (
    <TransactionsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </TransactionsProvider>
  );
}
