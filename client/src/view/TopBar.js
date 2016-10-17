import EventBus from '../events/EventBus'
import EventConstants from '../events/EventConstants'

class TopBar {

  constructor(service)
  {
    this._service = service;
    EventBus.instance.addEventListener(EventConstants.CALL_STATUS_UPDATE, this._handleCallStatusUpdate.bind(this));

    document.getElementsByClassName('navitem submitbutton')[0].addEventListener('click', (event => {
      var inputField = document.getElementsByClassName('urlinput')[0];
      var url = inputField.value;
      if(this._validateURL(url))
      {
        this._submitValidatedData(url);
      }
      else
      {
        inputField.value = "";
      }
    }), false);
  }

  _validateURL(url)
  {
    return /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(url);
  }

  // url was valid, reset UI
  _submitValidatedData(url)
  {
    this._service.getLinks(url , document.getElementsByClassName('depthinput')[0].value)
  }

  _handleCallStatusUpdate(event)
  {
  }

}

export default TopBar;
