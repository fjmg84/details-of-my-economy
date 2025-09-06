import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js';

declare global {
  interface Window {
    incomeVsExpenseChart?: Chart;
    expenseByCategoryChart?: Chart;
  }
}

export type { Chart, ChartConfiguration, ChartTypeRegistry };
