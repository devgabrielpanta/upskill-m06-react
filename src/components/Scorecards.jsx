import React from "react";

export default function Scorecards() {
  return (
    <>
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Saldo atual</div>
        <div className="stat-value text-primary">€ 1.500</div>
        <div className="stat-desc">Disponível em conta</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Receitas</div>
        <div className="stat-value text-success">€ 4.300</div>
        <div className="stat-desc text-success">↗︎ 400 (22%) mês passado</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Despesas</div>
        <div className="stat-value text-error">€ 2.800</div>
        <div className="stat-desc text-error">↘︎ 90 (14%) mês passado</div>
      </div>
    </>
  );
}
