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
      content: observable.shallowObject(store.get('content') ? store.get('content') : json)
    }, state)
  }

  put(key, {title, content}) {
    store.set('content', {...store.get('content'), [key]: {title, content}});
    this.content = {...store.get('content'), [key]: {title, content}};
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

  delete(key) {
    const filtered = Object.keys(this.content).filter(item => item !== key)
    this.content = filtered;
    store.set('content', filtered);

  }

  getByKey(key) {
    if (this.content[key]) {
      return this.content[key];
    } else {
      return {title: '', content: ''}
    }
  }

  get() {
    return this.content;
  }

};

