import Header from "./components/Header";
import TransactionsController from "./components/TransactionsController";
import TransactionsForm from "./components/TransactionsForm";
import TransactionsList from "./components/TransactionsList";
import Feedback from "./components/Feedback";
import Loading from "./components/Loading";
import TransactionsProvider from "./context/TransactionsProvider";

export default function App() {
  return (
    <TransactionsProvider>
      <Header />
      <TransactionsController />
      <TransactionsForm />
      <TransactionsList />
      <Feedback />
      <Loading />
      <footer>Footer here</footer>
    </TransactionsProvider>
  );
}
