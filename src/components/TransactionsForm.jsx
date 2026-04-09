import { useReducer } from "react";
import { useTransactions } from "../context/TransactionsProvider";
import { TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import { formattedAmountCurrency } from "../utils/dataTypeUtils";

const initialTransaction = {
  id: null,
  description: "",
  amount: formattedAmountCurrency(""),
  type: "income",
  category: "Selecionar...",
  date: new Date().toISOString().split("T")[0],
};

function reducer(state, action) {
  switch (action.type) {
    case "setInitialData":
      return (state = action.payload);
    case "setFieldValue":
      return (state = { ...state, [action.field]: action.value });
  }
}

export default function TransactionsForm() {
  const { transactionAction, setTransactionAction } = useTransactions();
  const [state, dispatch] = useReducer(reducer, initialTransaction);

  // Dispatch reducer state changes
  const handleInputChange = (field, value) => {
    let parsedValue = value;

    if (field === "amount") {
      parsedValue = formattedAmountCurrency(value);
    }

    dispatch({ type: "setFieldValue", field, value: parsedValue });
  };

  // Return income or expense button based on the variant
  const renderButton = (variant) => {
    const type = state.type;
    const isIncome = variant === "income";
    const Icon = isIncome ? TrendingUp : TrendingDown;
    const colorClass = isIncome ? "btn-success" : "btn-error";
    const text = isIncome ? "Receita" : "Despesa";

    return (
      <button
        className={`btn btn-soft btn-xs ${colorClass} ${type === variant ? "opacity-100 shadow-md" : "opacity-40"}`}
        onClick={() => handleInputChange("type", variant)}
      >
        <Icon />
        {text}
      </button>
    );
  };

  const handleCloseForm = () => {
    setTransactionAction(null);
    dispatch({ type: "setInitialData", payload: initialTransaction });
  };

  if (!transactionAction) return null;

  return (
    <div className="fixed top-0 right-0 w-screen min-w-screen h-screen min-h-screen z-40 flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-neutral/40 z-40"
        onClick={handleCloseForm}
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
          <button className="btn btn-soft" onClick={handleCloseForm}>
            Fechar
          </button>
        </div>

        <div className="divider"></div>

        <div className="flex flex-col w-full items-center gap-3">
          <div className="grid grid-cols-[6rem_1fr] gap-4 w-full">
            {/* AMOUNT */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Valor
              <input
                type="text"
                className={`input bg-base-200 ${state.type === "income" ? "text-green-600" : "text-red-600"}`}
                placeholder="0.00 €"
                value={state.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>

            {/* TYPE */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Tipo
              <div className="input bg-base-200">
                {renderButton("income")}
                {renderButton("expense")}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full items-center mt-4">
            {/* DATE */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Data
              <input
                type="date"
                className="input bg-base-200"
                value={state.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>

            {/* CATEGORY SELECTOR */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Categoria
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="input m-1 flex justify-between items-center bg-base-200"
                >
                  <span>{state.category}</span>
                  <ChevronDown />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a
                      onClick={() =>
                        handleInputChange("category", "Transporte")
                      }
                    >
                      Transporte
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleInputChange("category", "Aluguel")}>
                      Aluguel
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        handleInputChange("category", "Alimentação")
                      }
                    >
                      Alimentação
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2 text-xs font-medium w-full my-2">
            Descrição
            <input
              type="text"
              className="input bg-base-200 w-full"
              placeholder="Descreva a operação..."
              value={state.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-full">Guardar</button>
          <button
            className="btn btn-error btn-soft w-full"
            onClick={handleCloseForm}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
