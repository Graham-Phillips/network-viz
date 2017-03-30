class Spider {

  constructor() {
    this.crawler = null;
  }

  crawl(startURI, depth=2, callback) {
    if(!this.crawler)
    {
      var Crawler = require("simplecrawler");
      this.crawler = new Crawler(startURI);
      this.initialiseCrawler(this.crawler, depth);
    }

    this.crawler.start();

  }

  initialiseCrawler(crawler, depth) {

    this.crawler.parseHTMLComments = false;
    this.crawler.parseScriptTags = false;
    this.crawler.maxDepth = depth;
    this.crawler.interval = 750; // may beed to increase to avoid server problems
    this.crawler.maxConcurrency = 3;
    this.crawler.allowInitialDomainChange = true;
    this.crawler.filterByDomain = false;
    this.crawler.scanSubdomains = true;
    this.crawler.downloadUnsupported = false
    this.crawler.timeout=10000;
    this.crawler.decodeResponses=true; // char conversion to std javascript

    this.crawler.on("fetchcomplete", function(queueItem, responseBuffer, response)
    {
      console.log("fetchcomplete:", response);
    //   var continue = this.wait();
    //     doSomeDiscovery(data, function(foundURLs) {
    //         foundURLs.forEach(crawler.queueURL.bind(crawler));
    //         continue();
    //     });
    });

    this.crawler.on("complete", function(queueItem, responseBuffer, response) {
      console.log("on complete, response:", response);
    });

    this.crawler.on("queueadd", function(queueItem) {
      console.log("queueadd");
    });

    this.crawler.discoverResources = function(buffer, queueItem) {
      // simplecrawler's default resource discovery func given a buffer containing a resource, returns an array of URLs
        console.log(buffer.toString("utf8"));
        var $ = cheerio.load(buffer.toString("utf8"));

        return $("a[href]").map(function () {
            return $(this).attr("href");
        }).get();
    };
  }

}

module.exports = Spider;
