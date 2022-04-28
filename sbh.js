const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }
    const url = 'https://webapps.bps.go.id/olah/sbh2022/login/sso';
    const browser = await puppeteer.launch({ headless: false,
        args: [
            '--incognito',
        ],  
    
    });
    const page = await browser.newPage({ headless: false });

    const client = await page.target().createCDPSession();		
	await client.send('Network.clearBrowserCookies');

    
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });

    await page.type('#username', 'wayan.saputra');
    await page.type('#password', 'raw2man');
    await page.click('#kc-login');

    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 0 });

    // await page.goto("https://webapps.bps.go.id/olah/sbh2022/entriBL#/", { waitUntil: 'networkidle0', timeout: 0 });
    const cookies = await page.cookies();

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
                "x-xsrf-token": '"'+cookies[2].value+'"',
            },
            "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriBL",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"kd_prov\":\"74\",\"kd_kab\":\"71\",\"tw\":\"1\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        // let nks = await response.json();
        let nks = response;
        return nks;
    }, cookies);

    console.log("nks_response", nks_response);

    
    // console.log(cookies);
    // console.log("cookies 2 value")
    // console.log(cookies[2].value);

    

    // for (let index = 0; index < kecamatanLinks.length; index++) {
    // // for (let index = 0; index < 1; index++) {
    //     const element = kecamatanLinks[index];
    //     let formatElement = element.trim();
    //     formatElement = formatElement.split("/");
    //     formatElement = formatElement[formatElement.length - 1];
    //     // console.log(formatElement);

    //     let url_sekolah_replace = url_sekolah.replace("x_kode_wilayah" , formatElement);
    //     let url_sekolah_sma_replace = url_sekolah_sma.replace("x_kode_wilayah" , formatElement);
        
    //     //smk
    //     await page.goto(url_sekolah_replace, { waitUntil: 'networkidle0', timeout: 0 });

    //     let json_content = await page.evaluate(() => {
    //         const story = document.querySelector('body');
    //         const link = story.textContent;
    //         return link;
    //     });

    //     fs.writeFileSync("smk_"+formatElement+".json", json_content);

        
    //     //sma
    //     await page.goto(url_sekolah_sma_replace, { waitUntil: 'networkidle0', timeout: 0 });

    //     json_content = await page.evaluate(() => {
    //         const story = document.querySelector('body');
    //         const link = story.textContent;
    //         return link;
    //     });

    //     fs.writeFileSync("sma_"+formatElement+".json", json_content);



        
    // }
  
//   await browser.close();
})();