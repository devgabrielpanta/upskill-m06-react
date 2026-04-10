import TransactionCard from "../components/TransactionCard";
import TransactionsController from "../components/TransactionsController";
import { useTransactions } from "../context/TransactionsProvider";

export default function Transactions() {
  const { filteredTransactions } = useTransactions();

  return (
    <div className="flex flex-col md:flex-row w-full h-full p-8 gap-4">
      <div className="grid grid-cols-3 md:grid-cols-1 w-full md:w-1/3">
        <p>Saldo</p>
        <p>Receita total</p>
        <p>Despesa total</p>
      </div>

      <div className="flex flex-col">
        <TransactionsController />
        <div className="flex flex-col gap-4 w-full h-[calc(100vh-15%)] overflow-y-auto pb-10">
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
