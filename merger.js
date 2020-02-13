const exportFolder = './sma/';
const fs = require('fs');
// import mergeByKey from "array-merge-by-key";
const mergeByKey = require("array-merge-by-key");

let array_file_names = [];
let array_json_content = [];

fs.readdirSync(exportFolder).forEach(file => {
    // array_file_names.push(file);
    let contents = fs.readFileSync(exportFolder+file, 'utf8');
    let temp = JSON.parse(contents);

    // console.log(temp);
    array_json_content = mergeByKey("sekolah_id", array_json_content, temp);
    console.log(array_json_content);

});

fs.writeFileSync("sma_merge.json", JSON.stringify(array_json_content));

