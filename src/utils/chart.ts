import {
  Chart,
  registerables,
  type ChartConfiguration,
  type ChartType,
} from "chart.js";

Chart.register(...registerables);

interface GenerateChartParams {
  chartRef: { current: Chart | null };
  type: ChartType;
  title: string;
  elementId: string;
  labels: string[];
  data: number[];
  options?: ChartConfiguration<ChartType>["options"];
}

export function generateChart({
  chartRef,
  title,
  labels,
  data,
  type,
  elementId,
  options = {},
}: GenerateChartParams) {
  const canvas = document.getElementById(elementId) as HTMLCanvasElement | null;
  if (!canvas || !labels.length || !data.length) return;

  // Destroy existing chart if it exists
  if (chartRef.current) {
    chartRef.current.destroy();
  }

  const config: ChartConfiguration = {
    type,
    data: {
      labels,
      datasets: [
        {
          label: title,
          data,
          ...options,
        },
      ],
    },
  };

  chartRef.current = new Chart(canvas, config);
}
