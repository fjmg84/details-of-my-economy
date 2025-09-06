import type { CategoryConfig, TransactionType } from "src/types/finance";

export const Categories = {
  incomes: {
    salary: "Salario",
    freelance: "Freelance",
    investment: "Inversiones",
    other_income: "Otros ingresos",
  },
  expenses: {
    food: "Comida",
    transport: "Transporte",
    housing: "Vivienda",
    entertainment: "Entretenimiento",
    health: "Salud",
    shopping: "Compras",
    other_expense: "Otros gastos",
  },
};

// Category translations and colors with proper type
export const categoryConfig: CategoryConfig = {
  // Incomes
  salary: { label: Categories.incomes.salary, color: "#10B981" },
  freelance: { label: Categories.incomes.freelance, color: "#3B82F6" },
  investment: { label: Categories.incomes.investment, color: "#8B5CF6" },
  other_income: { label: Categories.incomes.other_income, color: "#6B7280" },
  // Expenses
  food: { label: Categories.expenses.food, color: "#EF4444" },
  transport: { label: Categories.expenses.transport, color: "#F59E0B" },
  housing: { label: Categories.expenses.housing, color: "#10B981" },
  entertainment: { label: Categories.expenses.entertainment, color: "#8B5CF6" },
  health: { label: Categories.expenses.health, color: "#EC4899" },
  shopping: { label: Categories.expenses.shopping, color: "#3B82F6" },
  other_expense: { label: Categories.expenses.other_expense, color: "#6B7280" },
};

export const EVENT_NAME = {
  TRANSACTIONS_UPDATED: "transactionsUpdated",
};

export const TRANSACTIONS: Record<TransactionType, string> = {
  income: "income",
  expense: "expense",
};

export const STORAGE_KEY = {
  TRANSACTIONS: "transactions",
};
