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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

handleCommands(bot);
startScheduler(bot);

