// Transaction types
type TransactionType = "income" | "expense";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  createdAt: string;
}

// Extend the Window interface
declare global {
  interface Window {
    showToast?: (message: string, type?: string) => void;
  }
}
