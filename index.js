// var http = require('http');
// const hostname = 'localhost';
// const port = 3000; // port number

// const server = http.createServer((req,res)=>{
//     console.log(req.headers);
//     res.statusCode = 200 ;
//     res.setHeader('Content-Type','text/html');
//     res.end('<html><body><h1>Hello wourld </h1></body></hmlt>');

// });
// server.listen(port,hostname,()=>{
//     console.log(`Servr running at http://${hostname}:${port}`);
// });

// Serving HTMl Files
const hostname = "localhost";
const port = 3000; // port number
const fs = require("fs");
const path = require("path");
const http = require("http");
const { exit } = require("process");

const server = http.createServer((req, res) => {
  console.log("Reqest for " + req.url + "by method " + req.method);
  if (req.method == "GET") {
    var fileURL;
    if (req.url == "/") fileURL = "/index.html";
    else fileURL = req.url;
    var filePath = path.resolve("./public" + fileURL);
    const fileExt = path.extname(filePath);
    if (fileExt == ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1> Error 404 ;" +
              fileURL +
              "not found </h1></body></html>"
          );
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body><h1> Error 404 ;" +
          fileURL +
          "not a HTML file </h1></body></html>"
      );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1> Error 404 ;" +
        req.method +
        "not supported </h1></body></html>"
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`Servr running at http://${hostname}:${port}`);
});
