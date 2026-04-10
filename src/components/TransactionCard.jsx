import { Pencil, Trash, EllipsisVertical, X } from "lucide-react";
import { formattedAmountCurrency } from "../utils/dataTypeUtils";
import { useState } from "react";

export default function TransactionCard({ transaction }) {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div
      key={`transaction-card-${transaction.id}`}
      className="relative card bg-base-200 shadow-md p-4 flex flex-row justify-between items-center gap-4 md:max-w-6xl"
    >
      <div className="w-4">
        <img
          src={`http://localhost:3001/api/categories/${transaction.category}/icon`}
          alt="Alimentação"
        />
      </div>

      <div className="flex grow flex-col md:flex-row gap-2 items-start md:items-center">
        <span className="text-xs font-light">
          {new Date(transaction.date).toLocaleDateString()}
        </span>
        <span className="text-sm line-clamp-2 truncate">
          {transaction.description}
        </span>
      </div>

      <div className="flex flex-row items-center gap-4 w-26 justify-end">
        <span
          className={`${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
        >
          {formattedAmountCurrency(transaction.amount)}
        </span>
      </div>

      <div className="absolute top-0 right-0">
        <button
          className="w-6 h-6 flex items-center justify-center"
          onClick={toggleMenuOpen}
        >
          <EllipsisVertical size={12} />{" "}
        </button>
        {openMenu && (
          <div className="absolute right-0 top-full mt-1 z-20 flex flex-col gap-2 bg-base-200 p-2 rounded shadow">
            <button className="btn btn-xs flex flex-row gap-2 items-center text-primary">
              <Pencil size={10} />
              <span className="text-xs">Editar</span>
            </button>
            <button className="btn btn-xs flex flex-row gap-2 items-center text-error">
              <Trash size={10} />
              <span className="text-xs">Excluir</span>
            </button>
            <button
              className="btn btn-xs flex flex-row gap-2 items-center"
              onClick={toggleMenuOpen}
            >
              <X size={10} />
              <span className="text-xs">Fechar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
