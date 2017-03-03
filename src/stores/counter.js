const {extendObservable, observable} = require('mobx');
// const Gun = require('gun');
import config from '../config/index';


// Gun.chain.count = function (num) {
//   if (typeof num === 'number') {
//     this.path(Gun.text.random()).put(num);
//   }
//   if (typeof num === 'function') {
//     var sum = 0;
//     this.map().val(function (val) {
//       num(sum += val);
//     });
//   }
//   return this;
// };
//
// Gun.chain.live = function (cb, opt) {
//   return this.on(function (val, field) {
//     delete val._;
//     cb.call(this, val, field);
//   }, opt);
// };

/**
 * @class Counter
 */

export default class Counter {
  constructor(request, state = {}) {
    let hits = '';
    /*const gun = Gun(config.gundb);
    console.log('using ' + config.gundb);
    // let db = gun.get('webstarter').path('hits');

    const updateData = (sum) => {
      gun.get('webstarter').put({hits: sum}, (ack) => {
        if (ack.err) {
          console.error(ack.err);
        }
        this.setCount(sum);
        console.log('Data synced');
      });
    };
    const db = gun.get('count');

    db.on((data) => {
      this.setCount(Object.keys(data).length);
    });
    db.count(+1);*/
    this.request = request;
    extendObservable(this, {
      hits
    }, state)
  }

  getCount() {
    // console.log('calling getCount');
    // console.log(this.hits);
    return this.hits;
  }

  setCount(count) {
    // console.log('calling setcount');
    this.hits = count;
  }
};

