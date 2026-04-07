import { createContext, useContext, useState } from "react";
import { initialTransactions } from "../utils/mockData";

export const TransactionsContext = createContext(null);

export default function TransactionsProvider({ children }) {
  const [transactionAction, setTransactionAction] = useState(null); // null | creating | editing | deleting
  const [transactionList, setTransactionList] = useState(initialTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactionList);

  return (
    <TransactionsContext.Provider
      value={{
        transactionAction,
        setTransactionAction,
        transactionList,
        setTransactionList,
        filteredTransactions,
        setFilteredTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions should be inside a TransactionsProvider");
  }
  return context;
}
