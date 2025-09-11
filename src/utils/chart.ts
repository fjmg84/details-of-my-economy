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
  elementId: string;
  labels: string[];
  datasets: ChartConfiguration<ChartType>["data"]["datasets"];
  options?: ChartConfiguration<ChartType>["options"];
}

export function generateChart({
  chartRef,
  datasets,
  labels,
  type,
  elementId,
  options = {},
}: GenerateChartParams) {
  const canvas = document.getElementById(elementId) as HTMLCanvasElement | null;
  if (!canvas || !labels.length || !datasets.length) return;

  // Destroy existing chart if it exists
  if (chartRef.current) {
    chartRef.current.destroy();
  }

  const config: ChartConfiguration = {
    type,

    data: {
      labels,
      datasets,
    },
    options,
  };

  chartRef.current = new Chart(canvas, config);
}
