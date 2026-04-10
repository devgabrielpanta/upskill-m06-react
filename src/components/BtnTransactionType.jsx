import { TrendingUp, TrendingDown } from "lucide-react";

export default function BtnTransactionType({ variant, active, onClickFn }) {
  const isIncome = variant === "income";
  const Icon = isIncome ? TrendingUp : TrendingDown;
  const colorClass = isIncome ? "btn-success" : "btn-error";
  const text = isIncome ? "Receita" : "Despesa";

  return (
    <button
      className={`btn btn-soft btn-xs ${colorClass} ${active ? "opacity-100 shadow-md" : "opacity-40"}`}
      onClick={onClickFn}
    >
      <Icon />
      {text}
    </button>
  );
}
