import { createContext, useContext, useState } from "react";
import { mockTransactionList, mockCategoryList } from "../utils/mockData";

const sortedCategoryList = mockCategoryList.sort((a, b) => {
  const isAOutros = String(a.label).toLowerCase() === "outro";
  const isBOutros = String(b.label).toLowerCase() === "outro";

  if (isAOutros && !isBOutros) return 1;

  if (!isAOutros && isBOutros) return -1;

  return String(a.label).localeCompare(b.label);
});

export const TransactionsContext = createContext(null);

export default function TransactionsProvider({ children }) {
  const [transactionAction, setTransactionAction] = useState(null); // null | creating | editing | deleting
  const [transactionList, setTransactionList] = useState(mockTransactionList);
  const [categoryList, setCategoryList] = useState(sortedCategoryList);
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
        categoryList,
        setCategoryList,
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
