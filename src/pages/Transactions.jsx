import TransactionCard from "../components/TransactionCard";
import TransactionsController from "../components/TransactionsController";
import { useTransactions } from "../context/TransactionsProvider";
import Scorecards from "../components/Scorecards";

export default function Transactions() {
  const { filteredTransactions } = useTransactions();

  return (
    <div className="flex flex-col md:flex-row w-full h-full max-h-screen p-8 gap-10 overflow-y-auto md:overflow-clip">
      <div className="w-full md:w-1/4 h-full md:h-[80%] md:my-auto">
        <div className="stats stats-vertical shadow-md shadow-info w-full h-full md:my-auto border border-info-content">
          <Scorecards />
        </div>
      </div>

      <div className="flex flex-col">
        <TransactionsController />
        <div className="flex flex-col gap-4 w-full pb-10 md:overflow-y-auto h-full">
          {filteredTransactions &&
            filteredTransactions.length > 0 &&
            filteredTransactions.map((transaction) => (
              <TransactionCard
                key={`transaction-card-${transaction.id}`}
                transaction={transaction}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
