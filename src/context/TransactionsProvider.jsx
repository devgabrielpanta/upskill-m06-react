import { createContext, useContext, useEffect, useState } from "react";
import { mockCategoryList } from "../utils/mockData";
import { createTransaction } from "../services/transaction.api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getTransactions } from "../services/transaction.api";

const sortedCategoryList = mockCategoryList.sort((a, b) => {
  const isAOutros = String(a.label).toLowerCase() === "outro";
  const isBOutros = String(b.label).toLowerCase() === "outro";

  if (isAOutros && !isBOutros) return 1;

  if (!isAOutros && isBOutros) return -1;

  return String(a.label).localeCompare(b.label);
});

export const TransactionsContext = createContext(null);

export default function TransactionsProvider({ children }) {
  // fetch transactions with react-query
  const { data: transactionList } = useQuery({
    queryKey: ["transactionsList"],
    queryFn: getTransactions,
  });

  const [transactionAction, setTransactionAction] = useState(null); // null | creating | editing | deleting
  const [categoryList, setCategoryList] = useState(sortedCategoryList);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactionList);

  const queryClient = useQueryClient();

  useEffect(() => {
    setFilteredTransactions(transactionList);
  }, [transactionList]);

  const createMutation = useMutation({
    mutationFn: (payload) => createTransaction(payload),
    onSuccess: (newTransaction) => {
      queryClient.setQueryData(["transactionsList"], (oldTransactions) => [
        ...oldTransactions,
        newTransaction,
      ]);
    },
  });

  return (
    <TransactionsContext.Provider
      value={{
        transactionAction,
        setTransactionAction,
        transactionList,
        filteredTransactions,
        setFilteredTransactions,
        categoryList,
        setCategoryList,
        createMutation,
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
