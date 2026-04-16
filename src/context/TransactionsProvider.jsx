import { createContext, useContext, useEffect, useReducer } from "react";
import { mockCategoryList } from "../utils/mockData";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
} from "../services/transaction.api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { initialTransactionData } from "../services/transaction.service";

const sortedCategoryList = mockCategoryList.sort((a, b) => {
  const isAOutros = String(a.label).toLowerCase() === "outro";
  const isBOutros = String(b.label).toLowerCase() === "outro";

  if (isAOutros && !isBOutros) return 1;

  if (!isAOutros && isBOutros) return -1;

  return String(a.label).localeCompare(b.label);
});

const initialState = {
  transactionAction: null, // null | creating | editing | deleting
  transactionList: [],
  filteredTransactions: [],
  categoryList: sortedCategoryList,
  transactionData: initialTransactionData,
};

function reducer(state, action) {
  switch (action.type) {
    case "setInitialData":
      return (state = { ...state, transactionData: initialTransactionData });
    case "setTransactionData":
      return (state = { ...state, transactionData: action.value });
    case "setFieldValue":
      return (state = {
        ...state,
        transactionData: {
          ...state.transactionData,
          [action.field]: action.value,
        },
      });
    case "setTransactionAction":
      return (state = { ...state, transactionAction: action.value });
    case "setTransactionList":
      return (state = { ...state, transactionList: action.value });
    case "setFilteredTransactions":
      return (state = { ...state, filteredTransactions: action.value });
    case "setCategoryList":
      return (state = { ...state, categoryList: action.value });
    default:
      return state;
  }
}

export const TransactionsContext = createContext(null);

export default function TransactionsProvider({ children }) {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch transactions with react-query
  const { data: transactionList } = useQuery({
    queryKey: ["transactionsList"],
    queryFn: getTransactions,
    onSuccess: (data) => {
      dispatch({ type: "setTransactionList", value: data });
    },
  });

  // set filtered transactions based on transaction list changes
  useEffect(() => {
    dispatch({ type: "setFilteredTransactions", value: transactionList || [] });
  }, [transactionList]);

  // reset transactionData to initialState when transactionAction is set to null /deleting one.
  useEffect(() => {
    if (state.transactionAction === null) {
      dispatch({ type: "setInitialData" });
    }
  }, [state.transactionAction]);

  const createMutation = useMutation({
    mutationFn: (payload) => createTransaction(payload),
    onSuccess: (newTransaction) => {
      queryClient.setQueryData(["transactionsList"], (oldTransactions) => [
        newTransaction,
        ...oldTransactions,
      ]);

      dispatch({ type: "setTransactionAction", value: null });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => updateTransaction(payload),
    onSuccess: (updatedTransaction) => {
      queryClient.setQueryData(["transactionsList"], (oldTransactions) => [
        updatedTransaction,
        ...oldTransactions.filter(
          (transaction) => transaction.id !== updatedTransaction.id,
        ),
      ]);

      dispatch({ type: "setTransactionAction", value: null });
    },
  });

  return (
    <TransactionsContext.Provider
      value={{
        ...state,
        dispatch,
        transactionList,
        createMutation,
        updateMutation,
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
