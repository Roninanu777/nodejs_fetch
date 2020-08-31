const https = require("https");
let base_url = "https://jsonmock.hackerrank.com/api/countries";

let urls = [];
for (let i = 0; i < 25; i++) {
  urls.push(`${base_url}?page=${i + 1}`);
}

function getData(urls) {
  return new Promise((resolve, reject) => {
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
              resolve(results);
            }
          });
        })
        .on("error", (err) => reject(err));
    });
  });
}

getData(urls)
  .then((data) => console.log(data[24]))
  .catch((err) => console.log(err));
