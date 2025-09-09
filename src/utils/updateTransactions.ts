// Update recent transactions
import type { Transaction } from "src/types/finance";
import { formatCurrency, formatDate } from "./lib";
import { categoryConfig } from "./config";
export const updateTransactions = ({
  rowsPerPage,
  currentPage,
  transactions,
  type,
}: {
  rowsPerPage: number;
  currentPage: number;
  transactions: Transaction[];
  type: "income" | "expense";
}) => {
  const paginatedIncome = transactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const container = document.getElementById("transactions");

  if (!container) return;

  if (paginatedIncome.length === 0) {
    container.innerHTML =
      '<div style="padding: 1rem; text-align: center; color: #6b7280;">No hay transacciones recientes</div>';
    return;
  }

  container.innerHTML = paginatedIncome
    .map(
      (t: Transaction) => `
      <div style="padding: 1rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb;">
        <div>
          <div style="font-weight: 500;">${t.description}</div>
          <div style="font-size: 0.875rem; color: #6b7280;">${
            categoryConfig[t.category]?.label || t.category
          } • ${formatDate(t.date)}</div>
        </div>
        <div style="font-weight: 500; color: ${
          type === "income" ? "#166534" : "#991b1b"
        }">
          ${
            type === "income"
              ? `+${formatCurrency(t.amount)}`
              : `-${formatCurrency(t.amount)}`
          }
        </div>
      </div>
    `
    )
    .join("");
};
