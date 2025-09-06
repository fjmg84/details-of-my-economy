import type { Transaction } from "src/types/finance";
import { STORAGE_KEY } from "./config";

// Get transactions from localStorage
export const getTransactions = (): Transaction[] => {
  const transactions = localStorage.getItem(STORAGE_KEY.TRANSACTIONS);
  return transactions ? JSON.parse(transactions) : [];
};

export const setTransactions = (transactions: Transaction[]) => {
  localStorage.setItem(STORAGE_KEY.TRANSACTIONS, JSON.stringify(transactions));
};
