import {
  BanknoteArrowUp,
  BanknoteArrowDown,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useDashboard } from "../../context/DashboardProvider";
import { formattedAmountCurrency } from "../../utils/dataTypeUtils";

export default function Scorecards() {
  const { totalBalance, totalIncome, totalExpense } = useDashboard();

  const cardData = [
    {
      title: "Saldo atual",
      value: formattedAmountCurrency(totalBalance),
      desc: (
        <span className="inline-flex gap-2 items-center">
          {totalBalance >= 0 ? (
            <>
              Saldo positivo <ThumbsUp size={14} />
            </>
          ) : (
            <>
              Saldo negativo <ThumbsDown size={14} />
            </>
          )}
        </span>
      ),
      icon:
        totalBalance >= 0 ? (
          <BanknoteArrowUp size={28} />
        ) : (
          <BanknoteArrowDown size={28} />
        ),
      color: "text-primary",
    },
    {
      title: "Receitas",
      value: formattedAmountCurrency(totalIncome),
      desc: "Total de entradas",
      icon: <TrendingUp size={28} />,
      color: "text-success",
    },
    {
      title: "Despesas",
      value: formattedAmountCurrency(totalExpense),
      desc: "Total de saídas",
      icon: <TrendingDown size={28} />,
      color: "text-error",
    },
  ];

  return (
    <>
      {cardData.map((card, index) => (
        <div key={`card-${index}`} className="stat max-w-fit">
          <div className={`stat-figure ${card.color}`}>{card.icon}</div>
          <div className="stat-title">{card.title}</div>
          <div className={`stat-value ${card.color}`}>{card.value}</div>
          <div className={`stat-desc ${card.color}`}>{card.desc}</div>
        </div>
      ))}
    </>
  );
}
