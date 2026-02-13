// Update recent transactions
import type { Transaction } from "src/types/finance";
import { formatCurrency, formatDate } from "./lib";
import { categoryConfig } from "./config";

const typeToColor = {
  income: "#16A34A",
  expense: "#DC2626",
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

  if (!container) return;

  if (transactions.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-400">No hay transacciones recientes</p>
      </div>
    `;
    return;
  }

  const tableHTML = `
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Descripción</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoría</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
            <th class="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Monto</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          ${transactions
            .map(
              (t: Transaction) => `
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">${t.description}</div>
                <div class="text-xs text-gray-500 mt-1">Creada el ${formatDate(t.createdAt)}</div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                  ${categoryConfig[t.category]?.label || t.category}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-700">${formatDate(t.date)}</div>
              </td>
              <td class="px-6 py-4 text-right">
                <span class="text-sm font-semibold" style="color: ${typeToColor[t.type]}">
                  ${typeToSymbol[t.type]}${formatCurrency(t.amount)}
                </span>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = tableHTML;
};
