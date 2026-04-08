import { useTransactions } from "../context/TransactionsProvider";
import { TrendingUp, TrendingDown, ChevronDown } from "lucide-react";

const Fieldset = ({ legend, children }) => {
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
      <legend className="fieldset-legend">{legend}</legend>
      {children}
    </fieldset>
  );
};

export default function TransactionsForm() {
  const { transactionAction, setTransactionAction } = useTransactions();

  if (!transactionAction) return null;

  return (
    <div className="fixed top-0 right-0 w-screen min-w-screen h-screen min-h-screen z-40 flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-neutral/40 z-40"
        onClick={() => setTransactionAction(null)}
      ></div>
      <div className="flex flex-col bg-base-100 z-50 rounded-lg w-[90vw] h-[50vh] lg:w-fit lg:h-fit p-4">
        <div className="flex flex-row items-end justify-between">
          <h4 className="text-md font-bold">
            {`
              ${transactionAction === "creating" ? "Adicionar" : transactionAction === "editing" ? "Editar" : "Excluir"}
            Transação`}
          </h4>
          <button
            className="btn btn-soft"
            onClick={() => setTransactionAction(null)}
          >
            Fechar
          </button>
        </div>
        <div className="divider"></div>

        <div className="flex flex-col w-full items-center">
          {/* TYPE */}
          <div className="grid grid-cols-2 w-full gap-4">
            <button className="btn btn-success btn-soft">
              <TrendingUp />
              Receita
            </button>
            <button className="btn btn-error btn-soft">
              <TrendingDown />
              Despesa
            </button>
          </div>

          {/* VALOR / STATUS */}
          <Fieldset legend={"Valor"}>
            <div className="flex flex-row justify-between items-center gap-4">
              <input type="text" className="input" placeholder="0.00 €" />

              <div className="flex flex-col items-center gap-1">
                <input
                  type="checkbox"
                  className="toggle toggle-sm toggle-primary"
                  defaultChecked
                />
                <span className="text-xs font-light">pendente</span>
              </div>
            </div>
          </Fieldset>

          {/* Data / Status */}
          <div className="flex flex-row gap-4 justify-between items-center w-full">
            <Fieldset legend={"Data"}>
              <input type="date" className="input" />
            </Fieldset>
            <Fieldset legend={"Categoria"}>
              <div className="dropdown w-30">
                <div
                  tabIndex={0}
                  role="button"
                  className="input m-1 flex justify-between items-center"
                >
                  <span>Alimentação</span>
                  <ChevronDown />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <a>Transporte</a>
                  </li>
                  <li>
                    <a>Aluguel</a>
                  </li>
                </ul>
              </div>
            </Fieldset>
          </div>

          <Fieldset legend={"Descrição"}>
            <input type="text" className="input" />
          </Fieldset>

          <button className="btn btn-primary mt-4">Guardar</button>
        </div>
      </div>
    </div>
  );
}
