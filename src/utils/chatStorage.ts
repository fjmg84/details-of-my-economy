interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatHistory {
  messages: ChatMessage[];
  sessionStartedAt: number;
}

const CHAT_STORAGE_KEY = "chat_history";
const CHAT_EXPIRATION_HOURS = 24;

/**
 * Obtiene el historial de chat válido (menos de 24 horas)
 */
export const getChatHistory = (): ChatMessage[] => {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return [];

    const history: ChatHistory = JSON.parse(stored);
    const now = Date.now();
    const expirationTime = CHAT_EXPIRATION_HOURS * 60 * 60 * 1000;

    // Filtrar mensajes que aún son válidos (menos de 24 horas)
    const validMessages = history.messages.filter(
      (msg) => now - msg.timestamp < expirationTime,
    );

    return validMessages;
  } catch (error) {
    console.error("Error reading chat history:", error);
    return [];
  }
};

/**
 * Guarda un nuevo mensaje en el historial
 */
export const saveChatMessage = (
  role: "user" | "assistant",
  content: string,
): void => {
  try {
    const history = getChatHistory();
    const now = Date.now();

    const newMessage: ChatMessage = {
      role,
      content,
      timestamp: now,
    };

    history.push(newMessage);

    const chatHistory: ChatHistory = {
      messages: history,
      sessionStartedAt: Date.now(),
    };

    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
  } catch (error) {
    console.error("Error saving chat message:", error);
  }
};

/**
 * Limpia los mensajes expirados (más de 24 horas)
 */
export const cleanExpiredMessages = (): void => {
  try {
    const validMessages = getChatHistory();

    if (validMessages.length === 0) {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      return;
    }

    const chatHistory: ChatHistory = {
      messages: validMessages,
      sessionStartedAt: Date.now(),
    };

    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
  } catch (error) {
    console.error("Error cleaning expired messages:", error);
  }
};

/**
 * Obtiene estadísticas del historial
 */
export const getChatStats = () => {
  const messages = getChatHistory();
  const userMessages = messages.filter((m) => m.role === "user").length;
  const assistantMessages = messages.filter(
    (m) => m.role === "assistant",
  ).length;

  return {
    totalMessages: messages.length,
    userMessages,
    assistantMessages,
    isEmpty: messages.length === 0,
  };
};

/**
 * Limpia todo el historial de chat
 */
export const clearChatHistory = (): void => {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing chat history:", error);
  }
};
