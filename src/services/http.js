import {wrapped} from '@nrk/origo-http';
import {extend} from 'lodash';

const requestHandlers = [];
const responseHandlers = [];
const http = wrapped(requestHandlers, responseHandlers);

export default extend(http, {
  addRequestHandler (handler) {
    requestHandlers.push(handler);
  },

  addResponseHandler (handler) {
    responseHandlers.push(handler);
  }

});
