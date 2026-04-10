import { useEffect, useReducer, useState } from "react";
import {
  Search,
  ArrowUp,
  ArrowDown,
  Calendar,
  Banknote,
  Tag,
  SlidersHorizontal,
} from "lucide-react";
import BtnTransactionType from "./BtnTransactionType";
import { useTransactions } from "../context/TransactionsProvider";

const sortOrderOptions = [
  { order: "asc", icon: ArrowUp },
  { order: "desc", icon: ArrowDown },
];

const sortByOptions = [
  { sortBy: "date", label: "Data", icon: Calendar },
  { sortBy: "value", label: "Valor", icon: Banknote },
  { sortBy: "category", label: "Categoria", icon: Tag },
];

const initialState = {
  search: "",
  sortBy: "date",
  sortOrder: "asc",
  filterType: "all", // all | income | expense
  selectedCategories: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setSearch":
      return { ...state, search: action.payload };
    case "setSortBy":
      return { ...state, sortBy: action.payload };
    case "setSortOrder":
      return { ...state, sortOrder: action.payload };
    case "setFilterType":
      return { ...state, filterType: action.payload };
    case "toggleCategory": {
      const category = action.payload;
      const isSelected = state.selectedCategories.includes(category);
      return {
        ...state,
        selectedCategories: isSelected
          ? state.selectedCategories.filter((c) => c !== category)
          : [...state.selectedCategories, category],
      };
    }
    case "reset":
      return initialState;
  }
};

export default function TransactionsController() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openController, setOpenController] = useState(false);
  const { categoryList } = useTransactions();

  // Handle side bar visibility based on window width (visible by default on desktop, hidden on mobile)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setOpenController(true);
      } else {
        setOpenController(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // pendente: implementar lógica para afetar a exibição transações
  }, [state]);

  const renderSearchBar = () => (
    <label className="input">
      <Search size={16} />
      <input
        type="search"
        className="grow"
        placeholder="Pesquisar..."
        value={state.search}
        onChange={(e) =>
          dispatch({ type: "setSearch", payload: e.target.value })
        }
      />
    </label>
  );

  if (!openController) {
    return (
      <div className="flex flex-row justify-between items-center w-full px-4 mt-4 gap-4">
        {renderSearchBar()}
        <button
          className="btn btn-primary btn-square btn-sm"
          onClick={() => setOpenController(true)}
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-96 h-full flex flex-col items-center py-10 px-6 bg-base-200">
      <button
        className="btn btn-primary btn-wide mb-6 md:hidden"
        onClick={() => setOpenController(false)}
      >
        Fechar
      </button>

      {/* SEARCH */}
      <div className="hidden md:flex w-full">
        {renderSearchBar()}
      </div>


      <div className="divider my-4"></div>

      {/* SORT SECTION */}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs uppercase font-semibold tracking-widest">
            ORGANIZAR
          </span>
          <div className="flex bg-base-100 rounded-md overflow-hidden">
            {sortOrderOptions.map((item) => (
              <button
                className={`btn btn-square btn-xs btn-soft rounded-none
                  ${String(state.sortOrder) === String(item.order) ? "btn-info opacity-100" : "btn-default opacity-50"}`}
                onClick={() =>
                  dispatch({ type: "setSortOrder", payload: item.order })
                }
              >
                <item.icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {sortByOptions.map((option) => (
          <button
            key={option.sortBy}
            className={`btn w-full justify-between items-center
              ${state.sortBy === option.sortBy ? "btn-soft btn-info" : "btn-ghost"}`}
            onClick={() =>
              dispatch({ type: "setSortBy", payload: option.sortBy })
            }
          >
            {option.label}
            <option.icon size={16} />
          </button>
        ))}
      </div>

      <div className="divider my-4"></div>

      {/* FILTERS SECTION */}
      <div className="flex flex-col gap-4 w-full">
        <span className="text-xs uppercase font-semibold tracking-widest">
          FILTRAR
        </span>

        {/* AMOUNT */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold">Valor</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`btn btn-soft btn-xs ${state.filterType === "all" ? "btn-info" : "opacity-30"}`}
              onClick={() =>
                dispatch({ type: "setFilterType", payload: "all" })
              }
            >
              Tudo
            </button>
            <BtnTransactionType
              variant={"income"}
              active={state.filterType === "income"}
              onClickFn={() =>
                dispatch({ type: "setFilterType", payload: "income" })
              }
            />
            <BtnTransactionType
              variant={"expense"}
              active={state.filterType === "expense"}
              onClickFn={() =>
                dispatch({ type: "setFilterType", payload: "expense" })
              }
            />
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-col gap-3 mt-4">
          <span className="text-xs font-semibold mb-1">Categorias</span>

          <div className="grid grid-cols-3 space-y-2">
            {categoryList.map((category) => (
              <div key={category.slug} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={state.selectedCategories.includes(category.slug)}
                  onChange={() =>
                    dispatch({ type: "toggleCategory", payload: category.slug })
                  }
                />
                <span className="text-xs">{category.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RESET BUTTON */}
      <div className="mt-2 md:mt-auto pt-8 pb-4 text-center">
        <button
          className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
          onClick={() => dispatch({ type: "reset" })}
        >
          Limpar Configurações
        </button>
      </div>
    </div>
  );
}
