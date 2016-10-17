/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _TopBar = __webpack_require__(1);

	var _TopBar2 = _interopRequireDefault(_TopBar);

	var _NetworkDisplay = __webpack_require__(4);

	var _NetworkDisplay2 = _interopRequireDefault(_NetworkDisplay);

	var _SpiderService = __webpack_require__(5);

	var _SpiderService2 = _interopRequireDefault(_SpiderService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// main entry point

	var spiderService = new _SpiderService2.default();
	var nav = new _TopBar2.default(spiderService);
	var networkDisplay = new _NetworkDisplay2.default(spiderService);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _EventBus = __webpack_require__(2);

	var _EventBus2 = _interopRequireDefault(_EventBus);

	var _EventConstants = __webpack_require__(3);

	var _EventConstants2 = _interopRequireDefault(_EventConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TopBar = function () {
	  function TopBar(service) {
	    var _this = this;

	    _classCallCheck(this, TopBar);

	    this._service = service;
	    _EventBus2.default.instance.addEventListener(_EventConstants2.default.CALL_STATUS_UPDATE, this._handleCallStatusUpdate.bind(this));

	    document.getElementsByClassName('navitem submitbutton')[0].addEventListener('click', function (event) {
	      var inputField = document.getElementsByClassName('urlinput')[0];
	      var url = inputField.value;
	      if (_this._validateURL(url)) {
	        _this._submitValidatedData(url);
	      } else {
	        inputField.value = "";
	      }
	    }, false);
	  }

	  _createClass(TopBar, [{
	    key: '_validateURL',
	    value: function _validateURL(url) {
	      return (/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(url)
	      );
	    }

	    // url was valid, reset UI

	  }, {
	    key: '_submitValidatedData',
	    value: function _submitValidatedData(url) {
	      this._service.getLinks(url, document.getElementsByClassName('depthinput')[0].value);
	    }
	  }, {
	    key: '_handleCallStatusUpdate',
	    value: function _handleCallStatusUpdate(event) {}
	  }]);

	  return TopBar;
	}();

	exports.default = TopBar;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	* SINGLETON
	*
	* Simple & naive implementation of synthetic Event system
	* Assumes that the callback used as a Map key will be a unique event listener..
	* Attempting to assign the same callback to more than one event would replace
	* the previous callback / handler
	*
	* Usage eg: EventBus.instance.addEventListener("clickEvent", clickHandler)
	**/
	var instance = void 0;
	var _singletonEnforcer = Symbol();

	var EventBus = function () {
	  // ensure that only EventBus can instantiate, via _singletonEnforcer
	  function EventBus(enforcer) {
	    _classCallCheck(this, EventBus);

	    if (enforcer != _singletonEnforcer) {
	      throw "Attempted to construct singleton, correct usage: ";
	    }
	    this._listeners = new Map();
	  }

	  _createClass(EventBus, [{
	    key: "addEventListener",
	    value: function addEventListener(type, callback) {
	      this._listeners.set(callback, type); // use the callback as the key
	    }
	  }, {
	    key: "removeEventListener",
	    value: function removeEventListener(callback) {
	      this._listeners.delete(callback);
	    }

	    /**
	    * send an event to any listeners. Usage, eg:
	    * let event = {type: "newDataEvent", data: [2,5,2,4]};
	    * EventBus.instance.dispatchEvent(event);
	    *
	    **/

	  }, {
	    key: "dispatchEvent",
	    value: function dispatchEvent(event) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this._listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = _slicedToArray(_step.value, 2);

	          var key = _step$value[0];
	          var value = _step$value[1];

	          if (value === event.type) {
	            key(event);
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }], [{
	    key: "instance",
	    get: function get() {
	      if (!this[instance]) {
	        this[instance] = new EventBus(_singletonEnforcer);
	      }
	      return this[instance];
	    }
	  }]);

	  return EventBus;
	}();

	// singleton instance


	exports.default = EventBus;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	*  static consts for error types
	**/
	var EventConstants = function () {
	  function EventConstants() {
	    _classCallCheck(this, EventConstants);
	  }

	  _createClass(EventConstants, null, [{
	    key: "CALL_STATUS_UPDATE",
	    get: function get() {
	      return "call_status_update";
	    }
	  }, {
	    key: "DATA_UPDATE",
	    get: function get() {
	      return "data_update";
	    }
	  }]);

	  return EventConstants;
	}();

	exports.default = EventConstants;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _EventBus = __webpack_require__(2);

	var _EventBus2 = _interopRequireDefault(_EventBus);

	var _EventConstants = __webpack_require__(3);

	var _EventConstants2 = _interopRequireDefault(_EventConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NetworkDisplay = function () {
	  function NetworkDisplay(service) {
	    _classCallCheck(this, NetworkDisplay);

	    this.service = service;
	    _EventBus2.default.instance.addEventListener(_EventConstants2.default.CALL_STATUS_UPDATE, this._handleCallStatusUpdate.bind(this));

	    _EventBus2.default.instance.addEventListener(_EventConstants2.default.DATA_UPDATE, this._handleDataUpdate.bind(this));
	  }

	  _createClass(NetworkDisplay, [{
	    key: '_handleCallStatusUpdate',
	    value: function _handleCallStatusUpdate(event) {}
	  }, {
	    key: '_handleDataUpdate',
	    value: function _handleDataUpdate(event) {}
	  }]);

	  return NetworkDisplay;
	}();

	exports.default = NetworkDisplay;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpiderService = function () {
	  function SpiderService() {
	    _classCallCheck(this, SpiderService);

	    this._xhrDefs = {
	      getLinks: {
	        method: "POST",
	        url: "spider-api",
	        timeout: 3000,
	        postData: null,
	        async: true,
	        successCallback: function successCallback(xhrResponse) {
	          console.log(xhrResponse.responseText);
	        },
	        errorCallback: function errorCallback(xhrResponse) {
	          console.error("The XHR failed with error ", xhrResponse.status);
	        },
	        timeoutCallback: function timeoutCallback() {
	          console.error("The XHR timed out.");
	        }
	      }
	    };
	  }

	  _createClass(SpiderService, [{
	    key: "registerDisplayPanel",
	    value: function registerDisplayPanel(panel) {
	      this._panel = panel;
	    }
	  }, {
	    key: "getLinks",
	    value: function getLinks(url, depth) {
	      var request = new XMLHttpRequest(),
	          myTimer = null;
	      request.open(this._xhrDefs.getLinks.method, this._xhrDefs.getLinks.url, this._xhrDefs.getLinks.async);
	      // Register the error and success handlers
	      request.onreadystatechange = function () {
	        if (request.readyState === 4) {
	          if (myTimer !== null) {
	            clearTimeout(myTimer);
	          }
	          // If there's an error, call the error callback,
	          // Otherwise call the success callback.
	          if (request.status !== 200 && request.status !== 304) {
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
	          myTimer = setTimeout(this._xhrDefs.getLinks.timeoutCallback, this._xhrDefs.getLinks.timeout);
	        }
	      }
	      // Send the request
	      //request.send("dave=dunkly");
	      request.setRequestHeader("Content-Type", "application/json");
	      var data = {};
	      data.url = url;
	      data.depth = depth;

	      request.send(JSON.stringify(data));
	    }
	  }, {
	    key: "clearAll",
	    value: function clearAll() {}
	  }]);

	  return SpiderService;
	}();

	exports.default = SpiderService;

/***/ }
/******/ ]);