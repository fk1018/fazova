(async () => {
  const puppeteer = require("puppeteer-extra");
  const StealthPlugin = require("puppeteer-extra-plugin-stealth");

  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({ 
    headless: true,
    args: [ '--proxy-server=us-general-1.resdleafproxies.com:12579' ]
  });
  const page = await browser.newPage();
  await page.authenticate({
    username:'R4PPiYpcNj',
    password:'R4PPiYpcNj'
  })
  const navigationPromise = page.waitForNavigation();

  await page.goto("https://www.whatismyip.com/");
  await page.setViewport({ width: 3440, height: 1309 });
  await navigationPromise;

  // await page.waitForSelector("#login-form #email");
  // await page.click("#login-form #email");
  // await page.type("#login-form #email", "");

  // await page.waitForSelector("#login-form #pass");
  // await page.click("#login-form #pass");
  // await page.type("#login-form #pass", "");

  // await page.waitForSelector(
  //   ".block-content > #login-form > #send2 > span > span"
  // );
  // await page.click(".block-content > #login-form > #send2 > span > span");

  // await navigationPromise;

  await page.screenshot({ path: "testresult.png", fullPage: true });

  await browser.close();
})();
