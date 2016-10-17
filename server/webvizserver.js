class Main {
  constructor () {

    //var Spider = require("Spider");
    var HttpServer = require('./Server');
    this.server = new HttpServer();

  }
}

var main = new Main();
