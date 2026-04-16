import { createContext, useContext, useEffect, useState } from "react";
import { useTransactions } from "./TransactionsProvider";

export const DashboardContext = createContext();

export default function DashboardProvider({ children }) {
  const [data, setData] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    monthlyIncome: [],
    monthlyExpense: [],
    monthlyBalance: [],
    expenseByCategory: {},
  });

  const { filteredTransactions } = useTransactions();

  useEffect(() => {
    const handleCalculateDashboard = () => {
      let balance = 0;
      let income = 0;
      let expense = 0;
      let monthlyIncome = Array(12).fill(0);
      let monthlyExpense = Array(12).fill(0);
      let monthlyBalance = Array(12).fill(0);
      let expenseByCategory = {};

      filteredTransactions.forEach((transaction) => {
        if (transaction.type === "income") {
          balance += transaction.amount;
          income += transaction.amount;
        } else {
          balance -= transaction.amount;
          expense += transaction.amount;
        }

        const month = new Date(transaction.date).getMonth();
        if (transaction.type === "income") {
          monthlyIncome[month] += transaction.amount;
        } else {
          monthlyExpense[month] += transaction.amount;
        }

        for (let month = 0; month < 12; month++) {
          monthlyBalance[month] =
            (monthlyBalance[month - 1] || 0) +
            monthlyIncome[month] -
            monthlyExpense[month];
        }

        if (transaction.type === "expense") {
          if (!expenseByCategory[transaction.category]) {
            expenseByCategory[transaction.category] = 0;
          }
          expenseByCategory[transaction.category] += transaction.amount;
        }
      });

      setData({
        totalBalance: balance,
        totalIncome: income,
        totalExpense: expense,
        monthlyIncome,
        monthlyExpense,
        monthlyBalance,
        expenseByCategory,
      });
    };

    handleCalculateDashboard();
  }, [filteredTransactions]);

  return (
    <DashboardContext.Provider value={{ ...data }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
