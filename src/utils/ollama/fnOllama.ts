import type { Transaction } from "../../types/finance";
import { getTransactions } from "../storage";
import { calculateSummary, formatCurrency, formatDate } from "../lib";
import {
  API_URL,
  generateFinancialReportPrompts,
  principalPrompt,
} from "./configOllama";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const createFinancialAnalysisPrompt = (transactions: Transaction[] = []) => {
  const summary = calculateSummary(transactions);
  const transactionsContext =
    transactions.length > 0
      ? `\n\nDatos actuales del usuario:
RESUMEN FINANCIERO:
- Ingresos totales: ${formatCurrency(summary.income)}
- Gastos totales: ${formatCurrency(summary.expense)}
- Balance: ${formatCurrency(summary.balance)}
- Total de transacciones: ${transactions.length}

TRANSACCIONES RECIENTES (últimas ${Math.min(transactions.length, 20)}):
${transactions
  .slice(0, 20)
  .map(
    (t) =>
      `- ${formatDate(t.date)}: ${t.description} | ${
        t.type === "income" ? "+" : "-"
      }${formatCurrency(t.amount)} | Categoría: ${t.category}`,
  )
  .join("\n")}

${
  transactions.length > 20
    ? `\n(Mostrando solo las 20 más recientes de ${transactions.length} transacciones totales)`
    : ""
}`
      : "\n\nEl usuario aún no tiene transacciones registradas.";

  return [
    {
      role: "system",
      content: principalPrompt + transactionsContext,
    },
  ];
};

// Función para manejar streaming de respuestas
export const callOllamaStream = async (
  message: string,
  includeTransactions: boolean = true,
  onChunk?: (chunk: string) => void,
  previousMessages: ChatMessage[] = [],
): Promise<string> => {
  const transactions = includeTransactions ? getTransactions() : [];
  const prompt = createFinancialAnalysisPrompt(transactions);

  const draft = structuredClone(prompt);

  // Agregar el historial de conversaciones previas
  previousMessages.forEach((msg) => {
    draft.push({
      role: msg.role,
      content: msg.content,
    });
  });

  draft.push({
    role: "user",
    content: message,
  });

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      model: "llama3",
      stream: true,
      messages: draft,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No reader available");
  }

  let fullResponse = "";
  const decoder = new TextDecoder();

  // Manejar el streaming de la respuesta
  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter((line) => line.trim());

      for (const line of lines) {
        try {
          const jsonData = JSON.parse(line);
          if (jsonData.message?.content) {
            const content = jsonData.message.content;
            fullResponse += content;
            if (onChunk) {
              onChunk(content);
            }
          }
          // Si done es true, terminamos
          if (jsonData.done) {
            break;
          }
        } catch (e) {
          // Ignorar líneas que no son JSON válido
          console.log("Línea no válida:", line);
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  console.log("Respuesta completa:", fullResponse);

  return fullResponse;
};

// Función específica para generar reportes con streaming
export const generateFinancialReportStream = async (
  reportType: "summary" | "expenses" | "income" | "categories" | "trends",
  onChunk?: (chunk: string) => void,
  previousMessages: ChatMessage[] = [],
): Promise<string> => {
  return callOllamaStream(
    generateFinancialReportPrompts[reportType],
    true,
    onChunk,
    previousMessages,
  );
};

// Función para hacer preguntas específicas sobre transacciones con streaming
export const askAboutTransactionsStream = async (
  question: string,
  onChunk?: (chunk: string) => void,
  previousMessages: ChatMessage[] = [],
): Promise<string> => {
  return callOllamaStream(question, true, onChunk, previousMessages);
};
