const {extendObservable, observable} = require('mobx');
const Gun = require('gun');
import config from '../config/index';
const gun = Gun(config.gundb);
Gun.chain.count = function (num) {
  if (typeof num === 'number') {
    this.path(Gun.text.random()).put(num);
  }
  if (typeof num === 'function') {
    let sum = 0;
    this.map().val(function (val) {
      num(sum += val);
    });
  }
  return this;
};

/**
 * @class Counter
 */

export default class Counter {
  constructor(request, state = {}) {

    let db = gun.get("webstarter/counter");
    db.count( value => {
      this.setCount(value)
    });
    db.count(+1);

    // let sum = 0;
    // db.map().val(val => {
    //   return Number(val);
    // });
    // var sum = db.map(val=>val).reduce(function(acc, val) {
    //   return acc + val;
    // }, 0);

    // console.log(sum);
    // this.setCount(sum);

    // gun.get('webstarter/counter').val((node) =>{
    //   console.log(node)
    //   this.setCount(node)
    // });

    this.request = request;
    extendObservable(this, {
      hits: null
    }, state)
  }

  getCount() {
    return this.hits;
  }

  setCount(count) {
    this.hits = count;
  }
};

