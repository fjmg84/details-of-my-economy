// Update recent transactions
import type { Transaction } from "src/types/finance";
import { formatCurrency, formatDate } from "./lib";
import { categoryConfig } from "./config";

const typeToColor = {
  income: "#166534",
  expense: "#991b1b",
};

const typeToSymbol = {
  income: "+",
  expense: "-",
};

export const renderTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const container = document.getElementById("transactions");

  console.log({ transactions });

  if (!container) return;

  if (transactions.length === 0) {
    container.innerHTML =
      '<div style="padding: 1rem; text-align: center; color: #6b7280;">No hay transacciones recientes</div>';
    return;
  }

  container.innerHTML = transactions
    .map(
      (t: Transaction) => `
      <div style="padding: 1rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb;">
        <div>
          <div style="font-weight: 500;">${t.description}</div>
          <div style="font-size: 0.875rem; color: #6b7280;">${
            categoryConfig[t.category]?.label || t.category
          } • ${formatDate(t.date)}</div>
          <span style="font-size: 0.7rem; color: #6b7280;">Creada el ${formatDate(
            t.createdAt
          )}</span>
        </div>
        <div style="font-weight: 500; color: ${typeToColor[t.type]}">
          ${typeToSymbol[t.type]}${formatCurrency(t.amount)}
        </div>
      </div>
    `
    )
    .join("");
};
