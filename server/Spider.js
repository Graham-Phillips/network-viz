class Spider {

  constructor() {
    this.crawler = null;
  }

  crawl(startURI, callback, depth=2) {
    if(!this.crawler)
    {
      var Crawler = require("simplecrawler");
      this.crawler = new Crawler(startURI);
      this.initialiseCrawler(crawler, depth);
    }

    this.crawler.start();

  }

  initialiseCrawler(crawler, depth) {

    crawler.parseHTMLComments = false;
    crawler.parseScriptTags = false;
    crawler.maxDepth = depth;
    crawler.interval = 250;
    crawler.maxConcurrency = 5;
    crawler.allowInitialDomainChange = true;
    crawler.filterByDomain = false;
    crawler.scanSubdomains = true;
    crawler.downloadUnsupported = false;

    crawler.on("fetchcomplete", function(queueItem, responseBuffer, response)
    {
    //   var continue = this.wait();
    //     doSomeDiscovery(data, function(foundURLs) {
    //         foundURLs.forEach(crawler.queueURL.bind(crawler));
    //         continue();
    //     });
    });

    crawler.on("complete", function(queueItem, responseBuffer, response) {
      console.log("response:", response);
    });

    crawler.on("queueadd", function(queueItem) {

    });

    crawler.discoverResources = function(buffer, queueItem) {
        console.log(buffer.toString("utf8"));
        // var $ = cheerio.load(buffer.toString("utf8"));
        //
        // return $("a[href]").map(function () {
        //     return $(this).attr("href");
        // }).get();
    };
  }

}

module.exports = Spider;
