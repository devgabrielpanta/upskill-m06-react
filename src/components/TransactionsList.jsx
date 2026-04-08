import { useTransactions } from "../context/TransactionsProvider";

export default function TransactionsList() {
  const { filteredTransactions } = useTransactions();

  return (
    <div className="flex flex-col gap-2 border">
      <h2>Transactions List here:</h2>
      {filteredTransactions &&
        filteredTransactions.length > 0 &&
        filteredTransactions.map((transaction) => (
          <div className="bg-accent-content/20">{transaction.description}</div>
        ))}
    </div>
  );
}
