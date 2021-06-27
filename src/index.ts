const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const proxyChain = require('proxy-chain');
(async () => {

  puppeteer.use(StealthPlugin());
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
  
  const oldProxyUrl = "http://R4PPiYpcNj:R4PPiYpcNj@us-general-4.resdleafproxies.com:19739";
  const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

  // Prints something like "http://127.0.0.1:45678"
  console.log(newProxyUrl);

  const browser = await puppeteer.launch({
    args: [`--proxy-server=${newProxyUrl}`],
  });
  // Do your magic here...
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation()
  await page.setViewport({ width: 800, height: 600 })
  await page.goto('https://tilted.io')

  await navigationPromise

  await page.waitForTimeout(10000)
  await page.screenshot({ path: "example.png", fullPage:true });
  await browser.close();

  await proxyChain.closeAnonymizedProxy(newProxyUrl, true);
  
  await browser.close();
})();
