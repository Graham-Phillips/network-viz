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
let instance;
let _singletonEnforcer = Symbol();

class EventBus {
  // ensure that only EventBus can instantiate, via _singletonEnforcer
  constructor(enforcer) {
    if(enforcer != _singletonEnforcer)
    {
      throw "Attempted to construct singleton, correct usage: ";
    }
    this._listeners = new Map();
  }

  static get instance() {
    if(!this[instance]) {
      this[instance] = new EventBus(_singletonEnforcer);
    }
    return this[instance];
  }

  addEventListener (type, callback) {
    this._listeners.set(callback, type); // use the callback as the key
  }

  removeEventListener (callback) {
    this._listeners.delete(callback);
  }

/**
* send an event to any listeners. Usage, eg:
* let event = {type: "newDataEvent", data: [2,5,2,4]};
* EventBus.instance.dispatchEvent(event);
*
**/
  dispatchEvent (event) {
    for (let [key, value] of this._listeners) {
      if(value === event.type) {
        key(event);
      }
    }
  }
}

// singleton instance
export default EventBus;
