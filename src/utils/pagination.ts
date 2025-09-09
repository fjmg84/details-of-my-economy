import type { Transaction } from "src/types/finance";
import { updateTransactions } from "./updateTransactions";
import { EVENT_NAME } from "./config";

export const paginateTransactions = (
  transactions: Transaction[],
  type: "income" | "expense"
) => {
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
    pageInfo!.textContent = `Página ${currentPage} de ${maxPage} (${transactions.length} transacciones)`;
    updateTransactions({ rowsPerPage, currentPage, transactions, type });
  });

  siguienteBtn?.addEventListener("click", () => {
    if (currentPage < maxPage) {
      currentPage++;
    }
    pageInfo!.textContent = `Página ${currentPage} de ${maxPage} (${transactions.length} transacciones)`;
    updateTransactions({ rowsPerPage, currentPage, transactions, type });
  });

  // Initialize on load
  document.addEventListener("DOMContentLoaded", () => {
    pageInfo!.textContent = `Página ${currentPage} de ${maxPage} (${transactions.length} transacciones)`;
    updateTransactions({ rowsPerPage, currentPage, transactions, type });
  });

  // Listen for localStorage changes
  window.addEventListener("storage", (e) => {
    if (e.key === "transactions") {
      updateTransactions({ rowsPerPage, currentPage, transactions, type });
    }
  });

  // Listen for custom events (for same-tab updates)
  window.addEventListener(EVENT_NAME.TRANSACTIONS_UPDATED, () => {
    updateTransactions({ rowsPerPage, currentPage, transactions, type });
  });
};
