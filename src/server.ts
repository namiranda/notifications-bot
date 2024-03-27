import { handleCommands } from "./botCommands";
import { startScheduler } from "./scheduler";

const express = require('express')
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

const app = express()
const port = 3000
const token = process.env.TOKEN
const bot = new TelegramBot(token, {polling: true});

//TODO: make these parameters dynamic through the bot
const category = 'celulares'
const brand = 'samsung'
const model = 'S24'


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

handleCommands(bot);
startScheduler(bot, category, brand, model, 5 * 60 * 1000);
startScheduler(bot, "celulares", "Samsung", "S22", 60 * 60 * 1000); //To test if the bot is working
