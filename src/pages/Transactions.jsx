import TransactionCard from "../components/TransactionCard";
import { useTransactions } from "../context/TransactionsProvider";
import Scorecards from "../components/dashboard/Scorecards";
import { lazy, Suspense } from "react";

const TransactionsController = lazy(
  () => import("../components/TransactionsController"),
);

export default function Transactions() {
  const { filteredTransactions } = useTransactions();

  const renderedTransactions = () => {
    if (!filteredTransactions || filteredTransactions.length === 0)
      return (
        <>
          <p>Empty transactions...</p>
        </>
      );

    return filteredTransactions.map((transaction) => {
      if (typeof transaction === "undefined") {
        return null;
      }

      return <TransactionCard key={transaction.id} transaction={transaction} />;
    });
  };

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
          {renderedTransactions()}
        </div>
      </div>
    </div>
  );
}
