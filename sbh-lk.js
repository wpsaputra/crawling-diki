'use strict';

const puppeteer = require('puppeteer');

(async function main() {
  try {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'sbh_lk'
    });

    var triwulan = 1;
    var kabupaten = '72'
    
    connection.connect();
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
    await page.goto("https://webapps.bps.go.id/olah/sbh2022/entriLK#/", { waitUntil: 'networkidle0', timeout: 0 });

    const nks_response = await page.evaluate(async (cookies, triwulan, kabupaten) => {
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
            "body": "{\"kd_prov\":\"74\",\"kd_kab\":\""+kabupaten+"\",\"tw\":\""+triwulan+"\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        let nks = await response.json();
        // let nks = response;
        return nks;
    }, cookies, triwulan, kabupaten);

    console.log("nks_response", nks_response);

    let insert_columns = Object.keys(nks_response[0]);
    // returns array ['test', 'value']

    let insert_data = nks_response.reduce((a, i) => [...a, Object.values(i)], []);
    // returns array [['test1', 12], ['test2', 49]]

    var query = connection.query('REPLACE INTO nks (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
      if (error) throw error;
      // Neat!
    });
    console.log(query.sql); // INSERT INTO nks SET ....

    let entrilk_loop = [];

    for (let index = 0; index < nks_response.length; index++) {
      const nks = nks_response[index]["nks"];
      const entrilk_response = await page.evaluate(async (cookies, nks, triwulan, kabupaten) => {
        let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriLK", {
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
          "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriLK",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "{\"kd_prov\":\"74\",\"kd_kab\":\""+kabupaten+"\",\"nks\":\""+nks+"\"}",
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
        });
        let entris = await response.json();
        // let nks = response;
        return entris;
      }, cookies, nks, triwulan, kabupaten);

      console.log("entrilk_response", entrilk_response);
      let insert_columns = Object.keys(entrilk_response[0]);
      // returns array ['test', 'value']

      let insert_data = entrilk_response.reduce((a, i) => [...a, Object.values(i)], []);
      // returns array [['test1', 12], ['test2', 49]]

      var query = connection.query('REPLACE INTO entrilk (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
      console.log(query.sql); // INSERT INTO entris SET ....

      entrilk_loop = [...entrilk_loop, ...entrilk_response]
      
    }


    for (let index = 0; index < entrilk_loop.length; index++) {
      const element = entrilk_loop[index];
      const show_response = await page.evaluate(async (cookies, element, triwulan) => {
        let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriLK/show", {
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
          "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriLK",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "{\"triwulan\":\""+triwulan+"\",\"id_bs\":\""+element["id_bs"]+"\",\"id_dsrt\":\""+element["id_dsrt"]+"\"}",
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
        });
        let nks = await response.json();
        // let nks = response;
        return nks;
      }, cookies, element, triwulan);

      console.log("show_response", show_response);

      if(show_response["lk_detil"].length>0){
        let insert_columns = Object.keys(show_response["lk_detil"][0]);
        let insert_data = show_response["lk_detil"].reduce((a, i) => [...a, Object.values(i)], []);
        var query = connection.query('INSERT INTO lk_detil (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        console.log(query.sql); // INSERT INTO s_b6 SET ....
      }

      insert_columns = Object.keys(show_response["lk_dok"]);
      // insert_data = show_response["bl_dok"].reduce((a, i) => [...a, Object.values(i)], []);
      insert_data = Object.values(show_response["lk_dok"]);
      query = connection.query('INSERT INTO lk_dok (??) VALUES (?)', [insert_columns, insert_data], function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
      console.log(query.sql); // INSERT INTO s_dok SET ....

      insert_columns = Object.keys(show_response["bs"]);
      // insert_data = show_response["bs"].reduce((a, i) => [...a, Object.values(i)], []);
      insert_data = Object.values(show_response["bs"]);
      query = connection.query('INSERT INTO bS (??) VALUES (?)', [insert_columns, insert_data], function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
      console.log(query.sql); // INSERT INTO bs SET ....

      insert_columns = Object.keys(show_response["dsrt"]);
      // insert_data = show_response["dsrt"].reduce((a, i) => [...a, Object.values(i)], []);
      insert_data = Object.values(show_response["dsrt"]);
      query = connection.query('INSERT INTO dsrt (??) VALUES (?)', [insert_columns, insert_data], function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
      console.log(query.sql); // INSERT INTO dsrt SET ....
      
    }







    // await page.goto("https://webapps.bps.go.id/olah/sbh2022/logout", { waitUntil: 'networkidle0', timeout: 0 });
    connection.end(); //close mysql
    // await browser.close();
  } catch (err) {
    console.error(err);
  }
})();