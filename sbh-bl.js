'use strict';

const puppeteer = require('puppeteer');

(async function main() {
  try {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'sbh_bl'
    });

    var triwulan = 1;
    var bulan = 3;
    var kabupaten = '72';


    
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
    await page.goto("https://webapps.bps.go.id/olah/sbh2022/entriBL#/", { waitUntil: 'networkidle0', timeout: 0 });

    const nks_response = await page.evaluate(async (cookies, triwulan, bulan, kabupaten) => {
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
    }, cookies, triwulan, bulan, kabupaten);

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

    let entribl_loop = [];

    for (let index = 0; index < nks_response.length; index++) {
      const nks = nks_response[index]["nks"];
      const entribl_response = await page.evaluate(async (cookies, nks, triwulan, bulan, kabupaten) => {
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
            "body": "{\"kd_prov\":\"74\",\"kd_kab\":\""+kabupaten+"\",\"nks\":"+nks+",\"bulan\":"+bulan+"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        let entribl = await response.json();
        // let nks = response;
        return entribl;
      }, cookies, nks, triwulan, bulan, kabupaten);

      console.log("entribl_response", entribl_response);
      let insert_columns = Object.keys(entribl_response[0]);
      // returns array ['test', 'value']

      let insert_data = entribl_response.reduce((a, i) => [...a, Object.values(i)], []);
      // returns array [['test1', 12], ['test2', 49]]

      var query = connection.query('REPLACE INTO entribl (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
      console.log(query.sql); // INSERT INTO entribl SET ....

      entribl_loop = [...entribl_loop, ...entribl_response]
      
    }


    for (let index = 0; index < entribl_loop.length; index++) {
      const element = entribl_loop[index];
      console.log("{\"triwulan\":\"1\",\"bulan\":1,\"id_bs\":\""+element["id_bs"]+"\",\"id_dsrt\":\""+element["id_dsrt"]+"\"}");
      const show_response = await page.evaluate(async (cookies, element, triwulan, bulan) => {
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
            "body": "{\"triwulan\":\""+triwulan+"\",\"bulan\":"+bulan+",\"id_bs\":\""+element["id_bs"]+"\",\"id_dsrt\":\""+element["id_dsrt"]+"\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        let nks = await response.json();
        // let nks = response;
        return nks;
      }, cookies, element, triwulan, bulan);

      console.log("show_response", show_response);

      if(show_response["bl_b5"].length>0){
        let insert_columns = Object.keys(show_response["bl_b5"][0]);
        let insert_data = show_response["bl_b5"].reduce((a, i) => [...a, Object.values(i)], []);
        var query = connection.query('INSERT INTO bl_b5 (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        console.log(query.sql); // INSERT INTO bl_b5 SET ....
      }

      if(show_response["bl_b41"].length>0){
        insert_columns = Object.keys(show_response["bl_b41"][0]);
        insert_data = show_response["bl_b41"].reduce((a, i) => [...a, Object.values(i)], []);
        query = connection.query('INSERT INTO bl_b41 (??) VALUES ?', [insert_columns, insert_data], function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        console.log(query.sql); // INSERT INTO bl_b41 SET ....
      }

      insert_columns = Object.keys(show_response["bl_dok"]);
      // insert_data = show_response["bl_dok"].reduce((a, i) => [...a, Object.values(i)], []);
      insert_data = Object.values(show_response["bl_dok"]);
      query = connection.query('INSERT INTO bl_dok (??) VALUES (?)', [insert_columns, insert_data], function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
      console.log(query.sql); // INSERT INTO bl_dok SET ....

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


    // nks_response.forEach(async element => {
    //   let nks = element["nks"]
    //   const entribl_response = await page.evaluate(async (cookies, nks) => {
    //       let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriBL", {
    //           "headers": {
    //             "accept": "application/json, text/plain, */*",
    //             "accept-language": "en-US,en;q=0.9",
    //             "content-type": "application/json;charset=UTF-8",
    //             "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
    //             "sec-ch-ua-mobile": "?0",
    //             "sec-ch-ua-platform": "\"Windows\"",
    //             "sec-fetch-dest": "empty",
    //             "sec-fetch-mode": "cors",
    //             "sec-fetch-site": "same-origin",
    //             "x-requested-with": "XMLHttpRequest",
    //             "x-xsrf-token": cookies[2].value,
    //           },
    //           "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriBL",
    //           "referrerPolicy": "strict-origin-when-cross-origin",
    //           "body": "{\"kd_prov\":\"74\",\"kd_kab\":\"71\",\"nks\":"+nks+",\"bulan\":1}",
    //           "method": "POST",
    //           "mode": "cors",
    //           "credentials": "include"
    //       });
    //       let entribl = await response.json();
    //       // let nks = response;
    //       return entribl;
    //   }, cookies, nks);

    //   console.log("entribl_response", entribl_response);
      
    // });

    // const entribl_response = await page.evaluate(async (cookies) => {
    //     let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriBL", {
    //         "headers": {
    //           "accept": "application/json, text/plain, */*",
    //           "accept-language": "en-US,en;q=0.9",
    //           "content-type": "application/json;charset=UTF-8",
    //           "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
    //           "sec-ch-ua-mobile": "?0",
    //           "sec-ch-ua-platform": "\"Windows\"",
    //           "sec-fetch-dest": "empty",
    //           "sec-fetch-mode": "cors",
    //           "sec-fetch-site": "same-origin",
    //           "x-requested-with": "XMLHttpRequest",
    //           "x-xsrf-token": cookies[2].value,
    //         },
    //         "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriBL",
    //         "referrerPolicy": "strict-origin-when-cross-origin",
    //         "body": "{\"kd_prov\":\"74\",\"kd_kab\":\"71\",\"nks\":\"15002\",\"bulan\":1}",
    //         "method": "POST",
    //         "mode": "cors",
    //         "credentials": "include"
    //     });
    //     let nks = await response.json();
    //     // let nks = response;
    //     return nks;
    // }, cookies);

    // console.log("entribl_response", entribl_response);


    // const show_response = await page.evaluate(async (cookies) => {
    //     let response = await fetch("https://webapps.bps.go.id/olah/sbh2022/resource/entriBL/show", {
    //         "headers": {
    //           "accept": "application/json, text/plain, */*",
    //           "accept-language": "en-US,en;q=0.9",
    //           "content-type": "application/json;charset=UTF-8",
    //           "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
    //           "sec-ch-ua-mobile": "?0",
    //           "sec-ch-ua-platform": "\"Windows\"",
    //           "sec-fetch-dest": "empty",
    //           "sec-fetch-mode": "cors",
    //           "sec-fetch-site": "same-origin",
    //           "x-requested-with": "XMLHttpRequest",
    //           "x-xsrf-token": cookies[2].value,
    //         },
    //         "referrer": "https://webapps.bps.go.id/olah/sbh2022/entriBL",
    //         "referrerPolicy": "strict-origin-when-cross-origin",
    //         "body": "{\"triwulan\":\"1\",\"bulan\":1,\"id_bs\":\"747115002\",\"id_dsrt\":\"001\"}",
    //         "method": "POST",
    //         "mode": "cors",
    //         "credentials": "include"
    //     });
    //     let nks = await response.json();
    //     // let nks = response;
    //     return nks;
    // }, cookies);

    // console.log("show_response", show_response);





    // await page.goto("https://webapps.bps.go.id/olah/sbh2022/logout", { waitUntil: 'networkidle0', timeout: 0 });
    connection.end(); //close mysql
    // await browser.close();
  } catch (err) {
    console.error(err);
  }
})();