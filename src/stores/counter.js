// // const {extendObservable, observable} = require('mobx');
// //
// // /**
// //  * @class Counter
// //  */
// // module.exports = class Counter {
// //
// //   constructor(request, state = {}) {
// //     this.request = request;
// //     extendObservable(this, {
// //       counter: null,
// //     }, state)
// //   }
// //
// // };
//
// // import { Provider } from 'inferno-mobx'
// import { observable } from 'mobx'
//
// export default observable({
//   counter: null
// });

const {extendObservable, observable} = require('mobx');

/**
 * @class Todos
 */
module.exports = class Counter {

  constructor(request, state = {}) {
    this.request = request;
    extendObservable(this, {
      counter: null
    }, state)
  }

  setCounter(count) {
    this.counter = count
  }
};

