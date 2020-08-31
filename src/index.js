const https = require("https");
let base_url = "https://jsonmock.hackerrank.com/api/countries";

let urls = [];
for (let i = 0; i < 25; i++) {
  urls.push(`${base_url}?page=${i + 1}`);
}

//Fetch all country details
function getData(callback) {
  let results = [];
  let expecting = urls.length;
  urls.forEach((url, index) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", (_) => {
          results[index] = JSON.parse(data).data;
          if (--expecting === 0) {
            callback(results);
          }
        });
        res.on("error", (err) => callback(err));
      })
      .on("error", (err) => callback(err));
  });
}

//Fetch country name
function getCountryName(code) {
  getData((results) => {
    let name = "";
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < results[i].length; j++) {
        if (results[i][j].alpha2Code === code) {
          name = results[i][j].name;
          break;
        }
      }
    }
    console.log(name);
  });
}

//Fetch country code
function getCountryCode(country) {
  getData((results) => {
    let name = "";
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < results[i].length; j++) {
        if (results[i][j].name === country) {
          name = results[i][j].alpha2Code;
          break;
        }
      }
    }
    console.log(name);
  });
}
