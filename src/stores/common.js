const {extendObservable} = require('mobx');

/**
 * @class Common
 */
module.exports = class Common {

  constructor(request, state = {}) {
    this.request = request;
    extendObservable(this, {
      title: 'Webstarter',
      statusCode: 200,
      hostname: 'localhost'
    }, state)
  }

  setTitle(newTitle) {
    this.title = newTitle
  }
};
