import axios from "axios";

export const sendTelegramNotification = async (message) => {
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Telegram credentials (BOT_TOKEN or CHAT_ID) are missing in environment variables.");
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    });
    return response.data;
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
    throw error;
  }
};
