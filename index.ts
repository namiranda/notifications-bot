const express = require('express')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()


const app = express()
const port = 3000

const token = process.env.TOKEN

const bot = new TelegramBot(token, {polling: true});


puppeteer.use(StealthPlugin())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


async function getProductList() {
    let currentPage: number = 1
    let hasNextPage: boolean = true
    let allItems: Array<Item> = []
    const baseUrl = 'https://tienda.personal.com.ar/celulares/samsung?page='

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 }); 


    while(hasNextPage) {
        console.log('Scraping page', currentPage)
        await page.goto(`${baseUrl}${currentPage}`)

        const items: Array<Item>  = await page.evaluate(() => {
            const items: Array<Item> = [];
            const productList = document.querySelectorAll('.emsye877');
            productList.forEach(product => {
                const title = product.querySelector('.emsye884')?.textContent?.trim() || '';
                const price = product.querySelector('.emsye87g')?.textContent?.trim() || '';
                items.push({ title, price });
            });
            return items;
        });

        allItems.push(...items)

       
        hasNextPage = currentPage <= 2
        currentPage++
    }

    await browser.close()
    return allItems
}

function getTargetItems(items, title): Array<Item> {
    let result: Array<Item> = []
    items.forEach(item => {
        if(item.title.includes(title)){
             result.push(item)
        }
    })
    return result;
}

bot.on('message', (msg) => {
    if (msg.text.toString().toLowerCase().indexOf("Hi") === 0) {
    bot.sendMessage(msg.chat.id,"Hi");
    }
    
});

setInterval(() => {
    const chatId = process.env.CHAT_ID

    getProductList().then(items => {
        let myItems = getTargetItems(items, "S22")
        if(myItems.length > 0 && chatId){
            bot.sendMessage(chatId, "Producto disponible en la tienda: " +  myItems.flatMap((i) => i.title));
        }
    })

}, 5 * 60 * 1000); // 5 minutes in 

interface Item {
    title: string,
    price: string
}