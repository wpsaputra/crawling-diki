'use strict';

const puppeteer = require('puppeteer');

(async function main() {
  try {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'sbh_s'
    });

    var triwulan = 1;
    var kabupaten = '71';
    
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
    await page.goto("https://webapps.bps.go.id/olah/sbh2022/entriS#/", { waitUntil: 'networkidle0', timeout: 0 });

    const nks_response = await page.evaluate(async (cookies, triwulan,kabupaten) => {
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

    let entris_loop = [];

    for (let index = 0; index < nks_response.length; index++) {
      const nks = nks_response[index]["nks"];
      const entris_response = await page.evaluate(async (cookies, nks, triwulan, kabupaten) => {
        let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriS", {
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
          "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriS",
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

      console.log("entris_response", entris_response);
      let insert_columns = Object.keys(entris_response[0]);
      // returns array ['test', 'value']

      let insert_data = entris_response.reduce((a, i) => [...a, Object.values(i)], []);
      // returns array [['test1', 12], ['test2', 49]]

      var query = connection.query('REPLACE INTO entris (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
      console.log(query.sql); // INSERT INTO entris SET ....

      entris_loop = [...entris_loop, ...entris_response]
      
    }


    for (let index = 0; index < entris_loop.length; index++) {
      const element = entris_loop[index];
      const show_response = await page.evaluate(async (cookies, element, triwulan) => {
        let unlock = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriS/unlockDokumen", {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json;charset=UTF-8",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
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
        let unlocked = await unlock.json();

        let lock = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriS/lockDokumen", {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json;charset=UTF-8",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
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
        let locked = await lock.json();

        let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriS/show", {
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
          "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriS",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": "{\"triwulan\":\""+triwulan+"\",\"id_bs\":\""+element["id_bs"]+"\",\"id_dsrt\":\""+element["id_dsrt"]+"\"}",
          "method": "POST",
          "mode": "cors",
          "credentials": "include"
        });
        let nks = await response.json();

        unlock = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriS/unlockDokumen", {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json;charset=UTF-8",
            "pragma": "no-cache",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
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
        unlocked = await unlock.json();

        // let nks = response;
        return nks;
      }, cookies, element, triwulan);

      console.log("show_response", show_response);

      if(show_response["s_b6"].length>0){
        let insert_columns = Object.keys(show_response["s_b6"][0]);
        let insert_data = show_response["s_b6"].reduce((a, i) => [...a, Object.values(i)], []);
        var query = connection.query('INSERT INTO s_b6 (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        console.log(query.sql); // INSERT INTO s_b6 SET ....
      }

      if(show_response["s_b7"].length>0){
        insert_columns = Object.keys(show_response["s_b7"][0]);
        insert_data = show_response["s_b7"].reduce((a, i) => [...a, Object.values(i)], []);
        query = connection.query('INSERT INTO s_b7 (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        console.log(query.sql); // INSERT INTO s_b7 SET ....
      }

      if(show_response["s_b41"].length>0){
        insert_columns = Object.keys(show_response["s_b41"][0]);
        insert_data = show_response["s_b41"].reduce((a, i) => [...a, Object.values(i)], []);
        query = connection.query('INSERT INTO s_b41 (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        console.log(query.sql); // INSERT INTO s_b41 SET ....
      }

      if(show_response["s_b81"].length>0){
        insert_columns = Object.keys(show_response["s_b81"][0]);
        insert_data = show_response["s_b81"].reduce((a, i) => [...a, Object.values(i)], []);
        query = connection.query('INSERT INTO s_b81 (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        console.log(query.sql); // INSERT INTO s_b81 SET ....
      }


      insert_columns = Object.keys(show_response["s_dok"]);
      // insert_data = show_response["bl_dok"].reduce((a, i) => [...a, Object.values(i)], []);
      insert_data = Object.values(show_response["s_dok"]);
      query = connection.query('INSERT INTO s_dok (??) VALUES (?)', [insert_columns, insert_data], function (error, results, fields) {
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
      if(entris_loop.length-1==index){
        console.log("FINISHED");
      }
      
    }







    // await page.goto("https://webapps.bps.go.id/olah/sbh2022/logout", { waitUntil: 'networkidle0', timeout: 0 });
    connection.end(); //close mysql
    // await browser.close();
  } catch (err) {
    console.error(err);
  }
})();