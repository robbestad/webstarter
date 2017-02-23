const {extendObservable, observable} = require('mobx');
const Gun = require('gun');
import config from '../config/index';

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
Gun.chain.live = function (cb, opt) {
  return this.on(function (val, field) {
    delete val._;
    cb.call(this, val, field);
  }, opt);
};

/**
 * @class Counter
 */

export default class Counter {
  constructor(request, state = {}) {
    const gun = Gun(config.gundb);
    console.log('using ' + config.gundb);
    let db = gun.get('webstarter').path('hits');

    const updateData = (sum) => {
      gun.get('webstarter').put({hits: sum}, function (ack) {
        if (ack.err) {
          console.error(ack.err);
        }
        console.log('Data synced');
      });
    };

    let newSum = 0;
    let hits = 0;
    db.live(data => {
      console.log(data);
      this.setCount(data);
      hits = data;
      newSum = ~~data + 1;
    });
    updateData(newSum);

    this.request = request;
    extendObservable(this, {
      hits
    }, state)
  }

  getCount() {
    console.log('calling getCount');
    console.log(this.hits);
    return this.hits;
  }

  setCount(count) {
    console.log('calling setcount');
    this.hits = count;
  }
};

