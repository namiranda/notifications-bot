import { getItemsList, getTargetItems } from "./scraper";
import * as TelegramBot from 'node-telegram-bot-api';

export function startScheduler (bot: TelegramBot, category: string, brand: string, model: string, time: number) {
    setInterval(async () => {
        const chatId = process.env.CHAT_ID;
        const items = await getItemsList(category, brand);
        console.log(items);
        const targetItems = getTargetItems(items, model);
        if (targetItems.length > 0 && chatId) {
            bot.sendMessage(chatId, `Producto disponible en la tienda: ${targetItems.map(item => { return `${item.title} - ${item.price}` }).join(', ')}`);
        }
    }, time); 
}