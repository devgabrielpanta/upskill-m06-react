import Scorecards from "../components/dashboard/Scorecards";
import CashFlowChart from "../components/dashboard/CashFlowChart";
import ExpenseByCategory from "../components/dashboard/ExpenseByCategory";
import { useTransactions } from "../context/TransactionsProvider";
import TransactionCard from "../components/TransactionCard";
import { Link } from "react-router";

export default function Home() {
  const { filteredTransactions } = useTransactions();

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-screen max-h-screen p-4 overflow-y-scroll">
      {/** LEFT */}
      <div className="flex flex-col gap-4 p-4 w-full">
        <h2 className="font-bold text-2xl">Olá, bem-vindo de volta!</h2>
        <div className="stats stats-vertical shadow-md shadow-info w-full min-h-fit border border-info-content">
          <Scorecards />
        </div>

        <div className="relative w-full h-60">
          <CashFlowChart />
        </div>
      </div>

      {/** RIGHT */}
      <div className="flex flex-col justify-between items-center gap-6 p-4 w-full">
        <div className="relative w-full md:h-60">
          <ExpenseByCategory />
        </div>

        <div className="flex flex-col gap-2 w-full h-full md:max-h-96 p-4 bg-base-200 border border-neutral rounded-lg shadow-lg shadow-neutral">
          <h3 className="font-semibold text-sm">Transação mais recente</h3>
          {filteredTransactions && filteredTransactions.length > 0 ? (
            <div className="flex flex-col gap-2 max-h-full overflow-y-auto">
              {filteredTransactions.slice(0, 4).map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
              <Link
                to="/transactions"
                className="btn btn-soft btn-primary w-full"
              >
                Ver todas as transações
              </Link>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhuma transação encontrada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
