import { NavLink } from "react-router";
import { Menu } from "lucide-react";
import { useTransactions } from "../context/TransactionsProvider";
import ThemeController from "./ThemeController";
import { House, Wallet } from "lucide-react";

const routeMap = [
  {
    label: "Dashboard",
    route: "/",
    icon: <House size={18} />,
  },
  {
    label: "Transações",
    route: "/transactions",
    icon: <Wallet size={18} />,
  },
];

const NavItems = () => {
  return (
    <>
      {routeMap.map((item, index) => (
        <li key={`navitem-mobile-${index}`} className="w-full">
          <NavLink
            to={item.route}
            className={({ isActive }) =>
              isActive
                ? "btn btn-outline btn-primary btn-wide"
                : "btn btn-outline btn-default btn-wide opacity-40"
            }
          >
            <span className="inline-flex gap-4 w-full items-center">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </span>
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default function Header({ children }) {
  const { dispatch } = useTransactions();

  return (
    <div className="drawer lg:drawer-open bg-base-100">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col w-full h-full items-center justify-center">
        {/* Page content here */}
        <header className="flex flex-row w-full items-center gap-2 lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-ghost drawer-button">
            <Menu />
          </label>
          <h1 className="text-xl font-bold">Logo Here</h1>
        </header>
        {children}
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="min-h-full w-80 p-4 bg-base-300 flex flex-col justify-between gap-10">
          <h1 className="text-xl font-bold">Logo Here</h1>
          <ul className="menu w-full h-full flex-1 items-start justify-start gap-4">
            <NavItems />
          </ul>
          <div className="flex flex-col w-full items-center gap-6">
            <button
              className="btn btn-sm btn-primary btn-wide"
              onClick={() =>
                dispatch({ type: "setTransactionAction", value: "creating" })
              }
            >
              Adicionar Transação
            </button>
            <ThemeController />
          </div>
        </div>
      </div>
    </div>
  );
}
