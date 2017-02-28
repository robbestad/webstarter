const {extendObservable, observable} = require('mobx');
const config = require('../config');
import { Link } from 'inferno-router';

/**
 * @class Klipp
 */

const seriesMapper = (item) => {
  let description = '';
  const {id, title, created, owner, resId, masterSystem, links} = item;
  if ('description' in item) {
    description = item.description;
  }
  return {id, title, created, owner, resId, masterSystem, links, description};
};

export default class Klipp {
  constructor(request, state = {}) {
    this.request = request;
    extendObservable(this, {
      items: observable.shallowArray([]),
      currentSeries: observable.shallowObject({})
    }, state)
  }

  createNewSeries(data) {
    const opts = {
      method: 'post',
      headers: new Headers({
        'Content-type': 'application/json',
        'charset': 'utf8'
      }),
      body: JSON.stringify(data)
    };
    return fetch(`/api/serie`, opts)
      .then(result => {
        return result.headers.get('Location');
      });

  }

  getSeriesInfo(id) {
    return fetch(`/api/serie/${id}`)
      .then(result => result.json().then(json => {
        this.currentSeries = seriesMapper(json);
      }));
  }

  getSeriesByTitle(text) {
    if (text.length < 2) return;
    return fetch(`/api/serie?title=${text}`)
      .then(result => result.json().then(json => {
        this.items = [];
        if (!json.length) {
          return;
        }
        this.items.push(seriesMapper(json[0]));
      }));
  }


};

