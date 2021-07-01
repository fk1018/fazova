import { LaunchOptions } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import Adblocker from 'puppeteer-extra-plugin-adblocker'
export const Task = async () => {

  puppeteer.use(StealthPlugin());
  puppeteer.use(Adblocker({ blockTrackers: true }))

  const username = 'UKlJFVk7';
  const password = 'E3RB6e2n2nksbBwF5gYkSd0lRU0HRILBo33q5CvXpEc2VoAImRYR1SC6QjCG5sKPu1tyw-XQvnTj4Q';
  const proxyIp = 'ustr24.resi.resdleafproxies.com:38661';
  // Prints something like "http://127.0.0.1:45678"
  // console.log(newProxyUrl);
  const launchOptions :FaszLaunchOptions = {
    args: [`--proxy-server=http://${proxyIp}`]
  }
  const browser = await puppeteer.launch(launchOptions);
  // Do your magic here...
  const page = await browser.newPage();

  await page.authenticate({username,password});

  const navigationPromise = page.waitForNavigation()
  await page.setViewport({ width: 800, height: 600 })
  await page.goto('https://whatismyip.com')

  await navigationPromise

  await page.waitForTimeout(10000)
  await page.screenshot({ path: "example.png", fullPage:true });
  
  await browser.close();
  return true;
}

export interface FaszLaunchOptions extends LaunchOptions {
  args: string[]
}