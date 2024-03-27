import { Item } from "./types/item";
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())


export async function getItemsList(category: string, brand: string) {
    let currentPage: number = 1
    let hasNextPage: boolean = true
    let allItems: Array<Item> = []
    const baseUrl = `https://tienda.personal.com.ar/${category}/${brand}?page=`

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 }); 

    console.log('Scraping items from', baseUrl)

    while(hasNextPage) {
        console.log('Scraping page', currentPage)
        await page.goto(`${baseUrl}${currentPage}`)

        const items: Array<Item>  = await page.evaluate(() => {
            const items: Array<Item> = [];
            const itemsList = document.querySelectorAll('.emsye877');
            itemsList.forEach(product => {
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

export function getTargetItems(items, title): Array<Item> {
    let result: Array<Item> = []
    items.forEach(item => {
        if(item.title.includes(title)){
             result.push(item)
        }
    })
    return result;
}