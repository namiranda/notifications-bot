import { getItemsList, getTargetItems } from "./scraper";
import * as TelegramBot from 'node-telegram-bot-api';

export const startScheduler = (bot: TelegramBot) => {
    setInterval(async () => {
        const chatId = process.env.CHAT_ID;
        const items = await getItemsList('category', 'brand');
        console.log(items);
        const targetItems = getTargetItems(items, 'S22');
        if (targetItems.length > 0 && chatId) {
            bot.sendMessage(chatId, `Items found: ${targetItems.map(item => item.title).join(', ')}`);
        }
    }, 5 * 60 * 1000); // 5 minutes
}