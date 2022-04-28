'use strict';

const puppeteer = require('puppeteer');

(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });
    const [page] = await browser.pages();

    // await page.goto('https://example.org/');

    const url = 'https://webapps.bps.go.id/olah/sbh2022/login/sso';
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });

    await page.deleteCookie();

    await page.type('#username', 'wayan.saputra');
    await page.type('#password', 'raw2man');
    await page.click('#kc-login');

    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 0 });

    const cookies = await page.cookies();
    await page.goto("https://webapps.bps.go.id/olah/sbh2022/entriBL#/", { waitUntil: 'networkidle0', timeout: 0 });

    const nks_response = await page.evaluate(async (cookies) => {
        let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/wilayah/nks", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json;charset=UTF-8",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "x-xsrf-token": cookies[2].value,
            },
            "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriBL",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"kd_prov\":\"74\",\"kd_kab\":\"71\",\"tw\":\"1\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        let nks = await response.json();
        // let nks = response;
        return nks;
    }, cookies);

    console.log("nks_response", nks_response);

    const entribl_response = await page.evaluate(async (cookies) => {
        let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriBL", {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/json;charset=UTF-8",
              "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-requested-with": "XMLHttpRequest",
              "x-xsrf-token": cookies[2].value,
            },
            "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriBL",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"kd_prov\":\"74\",\"kd_kab\":\"71\",\"nks\":\"15002\",\"bulan\":1}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        let nks = await response.json();
        // let nks = response;
        return nks;
    }, cookies);

    console.log("entribl_response", entribl_response);


    const show_response = await page.evaluate(async (cookies) => {
        let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriBL/show", {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/json;charset=UTF-8",
              "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-requested-with": "XMLHttpRequest",
              "x-xsrf-token": cookies[2].value,
            },
            "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriBL",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"triwulan\":\"1\",\"bulan\":1,\"id_bs\":\"747115002\",\"id_dsrt\":\"001\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        let nks = await response.json();
        // let nks = response;
        return nks;
    }, cookies);

    console.log("show_response", show_response);









    // await browser.close();
  } catch (err) {
    console.error(err);
  }
})();