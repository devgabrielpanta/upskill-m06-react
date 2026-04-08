import { useTransactions } from "../context/TransactionsProvider";

export default function TransactionsForm() {
  const { transactionAction, setTransactionAction } = useTransactions();

  if (!transactionAction) return null;

  return (
    <div className="fixed top-0 right-0 w-screen min-w-screen h-screen min-h-screen z-40 flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-neutral/40 z-40"
        onClick={() => setTransactionAction(null)}
      ></div>
      <div className="bg-base-100 z-50 rounded-lg w-1/3 h-1/3">
        transactions form here
      </div>
    </div>
  );
}
