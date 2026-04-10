import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

const cardData = [
  {
    title: "Saldo atual",
    value: "€ 1.500",
    desc: "Disponível em conta",
    icon: <Wallet size={28} />,
    color: "text-primary",
  },
  {
    title: "Receitas",
    value: "€ 4.300",
    desc: "↗︎ 400 (22%) mês passado",
    icon: <TrendingUp size={28} />,
    color: "text-success",
  },
  {
    title: "Despesas",
    value: "€ 2.800",
    desc: "↘︎ 90 (14%) mês passado",
    icon: <TrendingDown size={28} />,
    color: "text-error",
  },
];

export default function Scorecards() {
  return (
    <>
      {cardData.map((card, index) => (
        <div key={`card-${index}`} className="stat">
          <div className={`stat-figure ${card.color}`}>{card.icon}</div>
          <div className="stat-title">{card.title}</div>
          <div className={`stat-value ${card.color}`}>{card.value}</div>
          <div className={`stat-desc ${card.color}`}>{card.desc}</div>
        </div>
      ))}
    </>
  );
}
