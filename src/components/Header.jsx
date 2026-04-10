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
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default function Header({ children }) {

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

        <div className="min-h-full w-80 p-4 bg-base-200 flex flex-col justify-between gap-10">
          <h1 className="text-xl font-bold">Logo Here</h1>
          <ul className="menu h-full flex-1 items-start justify-start">
            <NavItems />
          </ul>
          <div>toggle theme</div>
        </div>
      </div>
    </div>
  );
}
