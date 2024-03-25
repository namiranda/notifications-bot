const express = require('express')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const app = express()
const port = 3000

puppeteer.use(StealthPlugin())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


getProductList().then(items => {
    console.log(items)
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
        await page.screenshot({ path: 'image.png', fullPage: true }); 

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


interface Item {
    title: string,
    price: string
}