import { Message } from 'node-telegram-bot-api';
import * as TelegramBot from 'node-telegram-bot-api';


export const handleCommands = (bot: TelegramBot) => {
    bot.on('message', (msg: Message) => {
        if (msg?.text?.toString().toLowerCase().indexOf("hi") === 0) {
            bot.sendMessage(msg.chat.id, "Hi");
        }
    });
}