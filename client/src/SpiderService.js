
class SpiderService
{
  constructor()
  {
    this._xhrDefs = {
      getLinks : {
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

  getLinks(url, depth)
  {
    let request = new XMLHttpRequest(),
    timeoutID = null;
    request.open(this._xhrDefs.getLinks.method, this._xhrDefs.getLinks.url, this._xhrDefs.getLinks.async);
    // Register the error and success handlers
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (timeoutID !== null) {
          clearTimeout(timeoutID);
        }
        // If there's an error, call the error callback,
        // Otherwise call the success callback.
        if ((request.status !== 200) && (request.status !== 304)) {
          if (this._xhrDefs.getLinks.errorCallback != null) {
            this._xhrDefs.getLinks.errorCallback(request);
          }
        } else {
          this._xhrDefs.getLinks.successCallback(request);
        }
      }
    }.bind(this);
    // Handle timeouts (set myXhrDefs.timeout to null to skip)
    // If we're working with a newer implementation, we can just set the
    // timeout property and register the timeout callback.
    // If not, we have to set a start running that will execute the
    // timeout callback. We can cancel the timer if/when the server responds.
    if (this._xhrDefs.getLinks.timeout !== null) {
      if (typeof request.ontimeout !== "undefined") {
        request.timeout = this._xhrDefs.getLinks.timeout;
        request.ontimeout = this._xhrDefs.getLinks.timeoutCallback;
      } else {
        timeoutID = setTimeout(this._xhrDefs.getLinks.timeoutCallback, this._xhrDefs.getLinks.timeout);
      }
    }
    // Send the request
    //request.send("dave=dunkly");
    request.setRequestHeader("Content-Type", "application/json");
    let data = {};
    data.url = url;
    data.depth = depth;

    request.send(JSON.stringify(data));

  }

  clearAll()
  {

  }
}

export default SpiderService;
