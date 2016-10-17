import EventBus from '../events/EventBus'
import EventConstants from '../events/EventConstants'

class NetworkDisplay {

  constructor(service)
  {
    this.service = service;
    EventBus.instance.addEventListener(EventConstants.CALL_STATUS_UPDATE,
        this._handleCallStatusUpdate.bind(this));

    EventBus.instance.addEventListener(EventConstants.DATA_UPDATE,
      this._handleDataUpdate.bind(this));
  }

  _handleCallStatusUpdate(event)
  {

  }

  _handleDataUpdate(event)
  {

  }

}

export default NetworkDisplay;
