// Global TypeScript declarations

// Toast functions
declare function showToast(message: string, type?: 'info' | 'success' | 'error' | 'warning'): void;
declare function showSuccess(message: string): void;
declare function showError(message: string): void;
declare function showWarning(message: string): void;

// Extend Window interface
declare global {
  interface Window {
    showToast: typeof showToast;
    showSuccess: typeof showSuccess;
    showError: typeof showError;
    showWarning: typeof showWarning;
    Toastify: any; // We'll type this properly in toastify.d.ts
  }
}

export {}; // This file needs to be a module

// Transaction types
type TransactionType = 'income' | 'expense';

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
