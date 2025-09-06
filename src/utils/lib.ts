import type { Transaction } from "src/types/finance";

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateSummary = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === "income") {
        acc.income += t.amount;
      } else {
        acc.expense += t.amount;
      }
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );
};

// Filter transactions by date range
export const filterTransactionsByDateRange = (
  transactions: Transaction[] = [],
  days: number = 30
): Transaction[] => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return transactions.filter((t) => new Date(t.date) >= date);
};

export const getTransactionsToday = (transactions: Transaction[]) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const todayStr = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;

  return transactions.filter((t) => t.createdAt.split("T")[0] === todayStr);
};

export const sortTransactionsByCreated = (transactions: Transaction[]) => {
  return [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};
