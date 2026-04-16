import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useDashboard } from "../../context/DashboardProvider";
import { useTransactions } from "../../context/TransactionsProvider";
import { useApp } from "../../context/AppProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseByCategory() {
  const { expenseByCategory } = useDashboard();
  const { categoryList } = useTransactions();
  const { theme } = useApp();

  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue(theme === "night" ? "--color-white" : "--color-black")
    .trim();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left",
        align: "center",
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        position: "top",
        align: "start",
        text: "Despesas por categoria",
        color: textColor,
      },
    },
  };

  const categoryData = Array.from(Object.entries(expenseByCategory))
    .map(([category, amount]) => ({
      category,
      amount,
      color: categoryList.find((cat) => cat.slug === category)?.color || "#ccc",
    }))
    .slice(0, 4);

  const data = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        label: "Despesas",
        data: categoryData.map((item) => item.amount),
        backgroundColor: categoryData.map((item) => item.color),
        borderColor: categoryData.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };
  return (
    <Doughnut
      className="bg-base-200 p-4 rounded-lg border border-neutral shadow-lg shadow-neutral"
      options={options}
      data={data}
    />
  );
}
