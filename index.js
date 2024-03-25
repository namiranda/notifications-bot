const express = require('express')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require('fs');
const app = express()
const port = 3000

puppeteer.use(StealthPlugin())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


getProductList().then(products => {
    console.log(products)
})

async function getProductList() {
    let currentPage = 1
    let hasNextPage = true
    let products = []
    const baseUrl = 'https://tienda.personal.com.ar/celulares/samsung?page='

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 }); 


    while(hasNextPage) {
        console.log('Scraping page', currentPage)
        await page.goto(`${baseUrl}${currentPage}`)
        await page.screenshot({ path: 'image.png', fullPage: true }); 

        const items = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('.emsye877'))
            return items.map(item => item.textContent);
        });

        console.log(items); 

       hasNextPage = false
        currentPage++
    }
    await browser.close()
    return products
}