const https = require("https");
console.log("\n");

let base_url = "https://jsonmock.hackerrank.com/api/countries";

function getData(url, page) {
  let api = `${url}?page=${page}`;
  return new Promise((resolve, reject) => {
    https
      .get(api, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", (_) => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => reject(err));
  });
}

getData(base_url, 1).then((data) => console.log(data));

// const request = require('request-promise');
// const urls = ["http://www.google.com", "http://www.example.com"];
// const promises = urls.map(url => request(url));
// Promise.all(promises).then((data) => {
//     // data = [promise1,promise2]
// });
