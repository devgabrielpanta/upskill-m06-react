import Header from "./components/Header";
import TransactionsController from "./components/TransactionsController";
import TransactionsForm from "./components/TransactionsForm";
import TransactionsList from "./components/TransactionsList";
import Feedback from "./components/Feedback";
import Loading from "./components/Loading";

export default function App() {
  return (
    <div className="w-screen min-w-screen h-screen min-h-screen flex flex-col">
      <Header />
      <TransactionsController />
      <TransactionsForm />
      <TransactionsList />
      <Feedback />
      <Loading />
      <footer>Footer here</footer>
    </div>
  );
}
