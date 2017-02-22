const {extendObservable, observable} = require('mobx');
const Gun = require('gun');
import config from '../config/index';
const gun = Gun(config.gundb);
// Gun.chain.count = function (num) {
//   if (typeof num === 'number') {
//     this.path(Gun.text.random()).put(num);
//   }
//   if (typeof num === 'function') {
//     let sum = 0;
//     this.map().val(function (val) {
//       num(sum += val);
//     });
//   }
//   return this;
// };
// Gun.chain.live = function(cb, opt){
//   return this.on(function(val, field){
//     delete val._;
//     cb.call(this, val, field);
//   }, opt);
// };

/**
 * @class Counter
 */

export default class Counter {
  constructor(request, state = {}) {

    let db = gun.get("webstarter/hits");

    let sum = 0;

    db.on((data) => {
      sum = ~~data.hits;
      this.setCount(sum + 1);
      console.log(data);
    });
    gun.get('webstarter/hits').put({hits: sum + 1});

    // db.count( value => {
    //   this.setCount(value)
    // });
    // db.count(+1);

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
      hits: ''
    }, state)
  }

  getCount() {
    return this.hits;
  }

  setCount(count) {
    this.hits = count;
  }
};

