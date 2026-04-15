import TransactionCard from "../components/TransactionCard";
//import TransactionsController from "../components/TransactionsController";
import { useTransactions } from "../context/TransactionsProvider";
import Scorecards from "../components/Scorecards";
import { lazy, Suspense } from "react";

const TransactionsController = lazy(
  () => import("../components/TransactionsController"),
);

export default function Transactions() {
  const { filteredTransactions } = useTransactions();

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <Suspense fallback={<p>Loading...</p>}>
        <TransactionsController />
      </Suspense>

      <div className="flex-1 p-10 max-h-screen overflow-y-auto">
        <div className="stats stats-vertical md:stats-horizontal shadow-md shadow-info w-full h-fit md:h-30 md:my-auto border border-info-content">
          <Scorecards />
        </div>

        <div className="flex grow flex-col gap-4 w-full min-h-fit mt-4 pb-20 md:pb-10">
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
