var Spider = require("./Spider");

var express = require("express");
var bodyParser = require("body-parser");

class Server {
  constructor () {
    this._spider = new Spider();
    var app = express();
    app.use(express.static("pub"));
    app.use(bodyParser.json());
    app.use(bodyParser.text());

    app.post('/spider-api', (req, res) => {
      console.log("url:"+ req.body.url);
      console.log("depth:"+ req.body.depth);
      this._spider.crawl(req.body.url, req.body.depth);
      res.set('Content-Type', 'application/json');
      res.send('{"p1":"dummy data from server"}');
    });
console.log("start listening on port 80");
    app.listen(80);
  }

}

module.exports = Server;
