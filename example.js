const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
    }
    const base_url = 'https://dapo.dikdasmen.kemdikbud.go.id';
    const url = 'https://dapo.dikdasmen.kemdikbud.go.id/sp/2/206000';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage({ headless: false });

    // const url_sekolah = 'https://dapo.dikdasmen.kemdikbud.go.id/rekap/progresSP?id_level_wilayah=3&kode_wilayah=206005&semester_id=20191&bentuk_pendidikan_id=smk';
    let url_sekolah = 'https://dapo.dikdasmen.kemdikbud.go.id/rekap/progresSP?id_level_wilayah=3&kode_wilayah=x_kode_wilayah&semester_id=20191&bentuk_pendidikan_id=smk';
    let url_sekolah_sma = 'https://dapo.dikdasmen.kemdikbud.go.id/rekap/progresSP?id_level_wilayah=3&kode_wilayah=x_kode_wilayah&semester_id=20191&bentuk_pendidikan_id=sma';
    
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });

    const kecamatanLinks = await page.evaluate(() => {
        const stories = Array.from(document.querySelectorAll('td > a'));
        const links = stories.map(story => story.getAttribute("href"));
        return links;
    });

    console.log(kecamatanLinks);

    

    for (let index = 0; index < kecamatanLinks.length; index++) {
    // for (let index = 0; index < 1; index++) {
        const element = kecamatanLinks[index];
        let formatElement = element.trim();
        formatElement = formatElement.split("/");
        formatElement = formatElement[formatElement.length - 1];
        // console.log(formatElement);

        let url_sekolah_replace = url_sekolah.replace("x_kode_wilayah" , formatElement);
        let url_sekolah_sma_replace = url_sekolah_sma.replace("x_kode_wilayah" , formatElement);
        
        //smk
        await page.goto(url_sekolah_replace, { waitUntil: 'networkidle0', timeout: 0 });

        let json_content = await page.evaluate(() => {
            const story = document.querySelector('body');
            const link = story.textContent;
            return link;
        });

        fs.writeFileSync("smk_"+formatElement+".json", json_content);

        
        //sma
        await page.goto(url_sekolah_sma_replace, { waitUntil: 'networkidle0', timeout: 0 });

        json_content = await page.evaluate(() => {
            const story = document.querySelector('body');
            const link = story.textContent;
            return link;
        });

        fs.writeFileSync("sma_"+formatElement+".json", json_content);


        // await page.goto(base_url+element, { waitUntil: 'networkidle0', timeout: 0 });
        // // SMA
        // await page.select('#selectJenjang', 'sma');
        // // await Promise.race([
        // //     page.waitForNavigation({ waitUntil: "networkidle0" }),
        // // ]);

        // console.log("before waiting");
        // delay(5000);
        // console.log("after waiting");

        // page.waitForSelector('#dataTables', {visible: true, timeout: 0})
        // // page.waitForSelector('#dataTables', {visible: true})

        // const smaLinks = await page.evaluate(() => {
        //     const stories = Array.from(document.querySelectorAll('td > a'));
        //     const links = stories.map(story => story.getAttribute("href"));
        //     return links;
        // });
        // console.log("smaLinks");
        // console.log(smaLinks);

        
    }
  
  await browser.close();
})();