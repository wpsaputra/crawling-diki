'use strict';

const puppeteer = require('puppeteer');

(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });
    const [page] = await browser.pages();

    // await page.goto('https://example.org/');

    const url = 'https://webapps.bps.go.id/olah/sbh2022/login/sso';
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });

    await page.type('#username', 'wayan.saputra');
    await page.type('#password', 'raw2man');
    await page.click('#kc-login');

    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 0 });

    await page.goto("https://webapps.bps.go.id/olah/sbh2022/entriBL#/");

    let x = "";
    page.on('response', async (response) => {    
      if (response.url().includes("webapps.bps.go.id/olah/sbh2022/entriBL")){
          console.log('XHR response received'); 
          // x =  await response.json()
          // console.log(x);
          // console.log(await response.json());
          console.log(await response);
      } 
    }); 








    // await browser.close();
  } catch (err) {
    console.error(err);
  }
})();