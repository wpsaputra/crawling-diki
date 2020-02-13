const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }
    const url = 'https://dapo.dikdasmen.kemdikbud.go.id/sekolah/';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage({ headless: false });

    let contents = fs.readFileSync("./smk_merge.json", 'utf8');
    contents = JSON.parse(contents);

    let arrResult = [];
    for (let index = 0; index < contents.length; index++) {
        const element = contents[index];
        console.log(element["sekolah_id_enkrip"].trim());
        await page.goto(url+element["sekolah_id_enkrip"].trim(), { waitUntil: 'networkidle0', timeout: 0 });

        const kontakLink = (await page.$$('.nav.nav-tabs > li >a'))[2];
        kontakLink.click();

        const reclick = await page.evaluate(() => {
            let x = document.querySelectorAll('.nav.nav-tabs > li >a');
            x[2].click();
            return x[2];
        });
        
        const detail = await page.evaluate(() => {
            let x = document.querySelectorAll('.panel-body');
            let textContent = x[7].textContent;
            return textContent;
        });

        console.log(detail);

        element["detail"] = detail;
        arrResult.push(element);

    }

    fs.writeFileSync("result_smk_merge.json", JSON.stringify(arrResult));
  
  await browser.close();
})();