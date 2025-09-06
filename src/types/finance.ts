export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  createdAt: string;
}

export interface CategoryConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

export interface Summary {
  income: number;
  expense: number;
  balance: number;
}

/* declare global {
  interface Window {
    incomeVsExpenseChart?: any;
    expenseByCategoryChart?: any;
    showToast?: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  }
} */
