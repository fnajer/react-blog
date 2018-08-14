import Noty from 'noty';

export default class NotyficationsService {
  success(message) {
    new Noty({
      type: 'success',
      text: message,
    }).show();
  }

  error(message) {
    new Noty({
      type: 'error',
      text: message,
    }).show();
  }
}
