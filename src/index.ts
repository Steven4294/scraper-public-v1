import * as schedule from "node-schedule";
import fetch from "node-fetch";
import puppeteer from "puppeteer";
import proxyChain from "proxy-chain";

var headless = false
async function main() {}

async function init() {
    const oldProxyUrl = '****';
    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

    const browser = await puppeteer.launch({
        headless: headless,
        args: [`--proxy-server=${newProxyUrl}`, '--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.keyboard.type('\n');
    await page.waitFor(10000);

    await browser.close();
    await proxyChain.closeAnonymizedProxy(newProxyUrl, true);
}

main().then(async () => {
    init()

    schedule.scheduleJob(`0 * 10 * * *`, async () => {
        console.log('loop')
    });
})

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}