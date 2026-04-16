import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDashboard } from "../../context/DashboardProvider";
import { useApp } from "../../context/AppProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const labels = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function CashFlowChart() {
  const { monthlyIncome, monthlyExpense, monthlyBalance } = useDashboard();
  const { theme } = useApp();

  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue(theme === "night" ? "--color-white" : "--color-black")
    .trim();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: "Fluxo de caixa mensal",
        color: textColor,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Saldo",
        data: labels.map((_, index) => monthlyBalance[index] || 0),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Receitas",
        data: labels.map((_, index) => monthlyIncome[index] || 0),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
      },
      {
        label: "Despesas",
        data: labels.map((_, index) => monthlyExpense[index] || 0),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
    ],
  };
  return (
    <Line
      className="bg-base-200 p-4 rounded-lg border border-neutral shadow-lg shadow-neutral"
      options={options}
      data={data}
    />
  );
}
