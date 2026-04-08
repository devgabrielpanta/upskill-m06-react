import { useState } from "react";
import { useTransactions } from "../context/TransactionsProvider";
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Check,
  ClipboardClock,
} from "lucide-react";

export default function TransactionsForm() {
  const { transactionAction, setTransactionAction, selectedTransaction } =
    useTransactions();

  // Local state for form fields, initialized with selectedTransaction values or defaults
  const [type, setType] = useState(selectedTransaction?.type || "income");
  const [amount, setAmount] = useState(selectedTransaction?.amount || "0.00");
  const [date, setDate] = useState(
    selectedTransaction?.date || new Date().toISOString().split("T")[0],
  );
  const [category, setCategory] = useState(
    selectedTransaction?.category || "Selecionar...",
  );
  const [fulfilled, setFulfilled] = useState(
    selectedTransaction?.fulfilled ?? true,
  );
  const [description, setDescription] = useState(
    selectedTransaction?.description || "",
  );

  // Return income or expense button based on the variant
  const renderButton = (variant) => {
    const isIncome = variant === "income";
    const Icon = isIncome ? TrendingUp : TrendingDown;
    const colorClass = isIncome ? "btn-success" : "btn-error";
    const text = isIncome ? "Receita" : "Despesa";

    return (
      <button
        className={`btn btn-soft btn-sm ${colorClass} ${type === variant ? "opacity-100 shadow-md" : "opacity-40"}`}
        onClick={() => setType(variant)}
      >
        <Icon />
        {text}
      </button>
    );
  };

  if (!transactionAction) return null;

  return (
    <div className="fixed top-0 right-0 w-screen min-w-screen h-screen min-h-screen z-40 flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-neutral/40 z-40"
        onClick={() => setTransactionAction(null)}
      ></div>
      <div className="flex flex-col bg-base-100 z-50 rounded-lg w-[90vw] lg:w-fit p-4">
        <div className="flex flex-row items-end justify-between">
          <h4 className="text-md font-bold">
            {transactionAction === "creating"
              ? "Adicionar "
              : transactionAction === "editing"
                ? "Editar "
                : "Excluir "}
            Transação
          </h4>
          <button
            className="btn btn-soft"
            onClick={() => setTransactionAction(null)}
          >
            Fechar
          </button>
        </div>

        <div className="divider"></div>

        <div className="flex flex-col w-full items-center gap-3">
          {/* INCOME / EXPENSE BUTTONS */}
          <div className="grid grid-cols-2 w-[90%] gap-4 bg-base-200 p-2 rounded-lg">
            {renderButton("income")}
            {renderButton("expense")}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            {/* AMOUNT */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Valor
              <input
                type="text"
                className={`input bg-base-200 ${type === "income" ? "text-green-600" : "text-red-600"}`}
                placeholder="0.00 €"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* DATE */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Data
              <input
                type="date"
                className="input bg-base-200"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full items-center mt-4">
            {/* CATEGORY SELECTOR */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Categoria
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="input m-1 flex justify-between items-center bg-base-200"
                >
                  <span>{category}</span>
                  <ChevronDown />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a onClick={() => setCategory("Transporte")}>Transporte</a>
                  </li>
                  <li>
                    <a onClick={() => setCategory("Aluguel")}>Aluguel</a>
                  </li>
                  <li>
                    <a onClick={() => setCategory("Alimentação")}>
                      Alimentação
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* STATUS */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Status
              <button
                className={`btn flex items-center justify-center bg-base-200`}
                onClick={() => setFulfilled(!fulfilled)}
              >
                {fulfilled ? (
                  <>
                    <Check size={16} />
                    <span>{type === "income" ? "Recebido" : "Pago"}</span>
                  </>
                ) : (
                  <>
                    <ClipboardClock size={16} />
                    <span>Pendente</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2 text-xs font-medium w-full my-2">
            Descrição
            <input
              type="text"
              className="input bg-base-200 w-full"
              placeholder="Descreva a operação..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-full">Guardar</button>
          <button className="btn btn-error btn-soft w-full">Cancelar</button>
        </div>
      </div>
    </div>
  );
}
