import type { Transaction } from "src/types/finance";
import { renderTransactions } from "./transactions";
import { EVENT_NAME } from "./config";

export const paginateTransactions = (transactions: Transaction[]) => {
  let rowsPerPage = 5;
  let maxPage = Math.ceil(transactions.length / rowsPerPage);
  let currentPage = 1;
  const anteriorBtn = document.getElementById("anteriorBtn");
  const siguienteBtn = document.getElementById("siguienteBtn");
  const pageInfo = document.getElementById("pageInfo");

  anteriorBtn?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
    }

    render(transactions);
  });

  siguienteBtn?.addEventListener("click", () => {
    if (currentPage < maxPage) {
      currentPage++;
    }
    render(transactions);
  });

  // Initialize on load
  document.addEventListener("DOMContentLoaded", () => {
    render(transactions);
  });

  // Listen for localStorage changes
  window.addEventListener("storage", (e) => {
    if (e.key === "transactions") {
      render(transactions);
    }
  });

  // Listen for custom events (for same-tab updates)
  window.addEventListener(EVENT_NAME.TRANSACTIONS_UPDATED, () => {
    render(transactions);
  });

  const render = (transactions: Transaction[]) => {
    const paginatedIncome = transactions.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
    pageInfo!.textContent = `Página ${currentPage} de ${maxPage} (${transactions.length} transacciones)`;
    renderTransactions({ transactions: paginatedIncome });
  };
};
