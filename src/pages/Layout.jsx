import { Outlet } from "react-router";
import Header from "../components/Header";
import Feedback from "../components/Feedback";
import Loading from "../components/Loading";
import TransactionsForm from "../components/TransactionsForm";

export default function Layout() {
  return (
    <div className="relative flex flex-col w-screen min-w-screen h-screen min-h-screen bg-base-200">
      <Header />
      <Outlet />
      <TransactionsForm />
      <Feedback />
      <Loading />
      <footer className="absolute bottom-0 footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
}
