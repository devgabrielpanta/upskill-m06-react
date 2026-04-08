import { useTransactions } from "../context/TransactionsProvider";
import { NavLink } from "react-router";
import { Menu } from "lucide-react";

const routeMap = [
  {
    label: "Dashboard",
    route: "/",
  },
  {
    label: "Transações",
    route: "/transactions",
  },
];

const NavItems = () => {
  return (
    <>
      {routeMap.map((item, index) => (
        <li key={`navitem-mobile-${index}`}>
          <NavLink
            to={item.route}
            className={({ isActive }) => isActive && "underline"}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default function Header() {
  const { setTransactionAction } = useTransactions();

  return (
    <header className="navbar bg-base-100 shadow-sm">
      {/* LEFT  */}
      <div className="navbar-start">
        <nav className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu />
          </div>
          {/* MOBILE MENU */}
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <NavItems />
          </ul>
        </nav>
        <h1 className="text-xl font-bold">Logo Here</h1>
      </div>
      {/* CENTER - DESKTOP MENU */}
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavItems />
        </ul>
      </nav>
      {/* RIGHT  */}
      <div className="navbar-end">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setTransactionAction("creating")}
        >
          Adicionar Transação
        </button>
      </div>
    </header>
  );
}
