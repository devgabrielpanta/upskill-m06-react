import { Outlet } from "react-router";
import Header from "../components/Header";
import Feedback from "../components/Feedback";
import Loading from "../components/Loading";
import TransactionsForm from "../components/TransactionsForm";

export default function Layout() {
  return (
    <div className="w-screen min-w-screen max-w-screen h-screen min-h-screen max-h-screen overflow-clip bg-base-200">
      <Header>
        <Outlet />
      </Header>

      <aside>
        <TransactionsForm />
        <Feedback />
        <Loading />
      </aside>
    </div>
  );
}
