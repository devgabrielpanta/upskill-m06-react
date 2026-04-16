import { useState } from "react";
import { useTransactions } from "../context/TransactionsProvider";
import { ChevronDown } from "lucide-react";
import {
  formattedAmountCurrency,
  formattedAmountNumber,
} from "../utils/dataTypeUtils";
import BtnTransactionType from "./BtnTransactionType";

export default function TransactionsForm() {
  const {
    transactionAction,
    transactionData,
    categoryList,
    dispatch,
    createMutation,
    updateMutation,
  } = useTransactions();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Dispatch reducer state changes
  const handleInputChange = (field, value) => {
    let parsedValue = value;

    if (field === "amount") {
      parsedValue = formattedAmountCurrency(value);
    }

    dispatch({ type: "setFieldValue", field, value: parsedValue });
    setDropdownOpen(false);
  };

  const getCategoryLabel = () => {
    let label = "";
    if (transactionData.category === null) {
      label = "Selecionar...";
    } else {
      label =
        categoryList.find((categ) => categ.slug === transactionData.category)
          ?.label || "";
    }

    return label;
  };

  const handleCloseForm = () => {
    dispatch({ type: "setTransactionAction", value: null });
  };

  const handleSubmit = () => {
    const payload = {
      ...transactionData,
      amount:
        transactionData.type === "income"
          ? formattedAmountNumber(transactionData.amount)
          : formattedAmountNumber(transactionData.amount) * -1,
    };
    switch (transactionAction) {
      case "creating":
        return createMutation.mutate(payload);
      case "editing":
        return updateMutation.mutate(payload);
    }
  };

  if (!transactionAction) return null;

  return (
    <div className="fixed top-0 right-0 w-screen min-w-screen h-screen min-h-screen z-40 flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-neutral/50 backdrop-blur-xs z-40"
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
                className={`input bg-base-200 ${transactionData.type === "income" ? "text-green-600" : "text-red-600"}`}
                placeholder="0.00 €"
                value={formattedAmountCurrency(transactionData.amount)}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>

            {/* TYPE */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Tipo
              <div className="input bg-base-200">
                <BtnTransactionType
                  variant="income"
                  active={transactionData.type === "income"}
                  onClickFn={() => handleInputChange("type", "income")}
                />
                <BtnTransactionType
                  variant="expense"
                  active={transactionData.type === "expense"}
                  onClickFn={() => handleInputChange("type", "expense")}
                />
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
                value={transactionData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>

            {/* CATEGORY SELECTOR */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              Categoria
              <div className="dropdown">
                <button
                  className="relative input m-1 flex justify-between items-center bg-base-200"
                  onClick={() => setDropdownOpen(true)}
                >
                  <span>{getCategoryLabel()}</span>
                  <ChevronDown />
                </button>
                {dropdownOpen && (
                  <ul className="absolute top-0 dropdown-content bg-base-200 rounded-box z-10 w-40 p-2 shadow-sm flex flex-col gap-2 h-50 overflow-y-scroll">
                    {categoryList.map((categ) => (
                      <li key={`categ-selector-${categ.slug}`}>
                        <button
                          className="btn btn-soft btn-xs w-full text-left"
                          onClick={() =>
                            handleInputChange("category", categ.slug)
                          }
                        >
                          <span>{categ.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
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
              value={transactionData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-full" onClick={handleSubmit}>
            Guardar
          </button>
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
