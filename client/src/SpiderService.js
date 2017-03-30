
class SpiderService
{
  constructor()
  {
    this._xhrDefs = {
      getLinkGraph : {
        method : "POST",
        url : "spider-api",
        timeout: 3000,
        postData: null,
        async: true,
        successCallback: function(xhrResponse) {
          console.log(xhrResponse.responseText);
        },
        errorCallback: function(xhrResponse) {
          console.error("The XHR failed with error ", xhrResponse.status);
        },
        timeoutCallback: function() {
          console.error("The XHR timed out.");
        }
      }
    }
  }

  registerDisplayPanel(panel)
  {
    this._panel = panel;
  }

  getLinkGraph(url, depth)
  {
    console.log("getLinkGraph: url=" + url);
    let request = new XMLHttpRequest(),
    timeoutID = null;
    request.open(this._xhrDefs.getLinkGraph.method, this._xhrDefs.getLinkGraph.url, this._xhrDefs.getLinkGraph.async);
    // Register the error and success handlers
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (timeoutID !== null) {
          clearTimeout(timeoutID);
        }
        // If there's an error, call the error callback,
        // Otherwise call the success callback.
        if ((request.status !== 200) && (request.status !== 304)) {
          if (this._xhrDefs.getLinkGraph.errorCallback != null) {
            this._xhrDefs.getLinkGraph.errorCallback(request);
          }
        } else {
          this._xhrDefs.getLinkGraph.successCallback(request);
        }
      }
    }.bind(this);
    // Handle timeouts (set myXhrDefs.timeout to null to skip)
    // If we're working with a newer implementation, we can just set the
    // timeout property and register the timeout callback.
    // If not, we have to set a start running that will execute the
    // timeout callback. We can cancel the timer if/when the server responds.
    if (this._xhrDefs.getLinkGraph.timeout !== null) {
      if (typeof request.ontimeout !== "undefined") {
        request.timeout = this._xhrDefs.getLinkGraph.timeout;
        request.ontimeout = this._xhrDefs.getLinkGraph.timeoutCallback;
      } else {
        timeoutID = setTimeout(this._xhrDefs.getLinkGraph.timeoutCallback, this._xhrDefs.getLinkGraph.timeout);
      }
    }
    // Send the request
    //request.send("dave=dunkly");
    request.setRequestHeader("Content-Type", "application/json");
    let data = {};
    data.url = url;
    data.depth = depth;
console.log("sending :" + data.url + " , " + data.depth);
    request.send(JSON.stringify(data));

  }

  clearAll()
  {

  }
}

export default SpiderService;
