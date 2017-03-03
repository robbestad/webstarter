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
import json from '../content/text.json';


/**
 * @class ContentStore
 */

export default class ContentStore {
  constructor(request, state = {}) {
    const eventLog = JSON.stringify([]);
    extendObservable(this, {
      content: observable.shallowObject(store.get('content') ? JSON.parse(store.get('content')) : json)
    }, state)
  }

  putContent() {
    // return this.request(`api/todos/add`, {text})
    //   .then(result => {
    //     // Add to list
    //     this.items.push({
    //       _id: result._id,
    //       text: result.text
    //     })
    //   })
  }

  get() {
    return this.content;
  }

};

