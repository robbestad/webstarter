const {extendObservable, observable} = require('mobx');
import config from '../config/index';
const engine = require('store/src/store-engine');
const storages = [
  require('store/storages/localStorage'),
  require('store/storages/cookieStorage')
];
const plugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire')
];
const store = engine.createStore(storages, plugins);

/**
 * @class EventLog
 */

export default class EventLog {
  constructor(request, state = {}) {
    const eventLog = JSON.stringify([]);
    extendObservable(this, {
      eventLog: observable.shallowArray(store.get('events') ? JSON.parse(store.get('eventLog')) : [])
    }, state)
  }

  getEvents() {
    return this.eventLog;
  }

  setEvent(event) {
    //console.log(this.eventLog.peek());
    this.eventLog.push(event);
    store.set('eventLog', JSON.stringify(this.eventLog))
  }
};

