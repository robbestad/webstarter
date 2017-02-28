import * as preLoginState from './preLoginState';
// import {gotoUrl} from '../actions/navigation';

function isUnauthorized(rejection) {
  return rejection.status === 401;
}

function nonResolvingPromise() {
  return new Promise(() => {});
}

export function configure({http}, store) {
  http.addResponseHandler((config, resPromise) => {
    return Promise.resolve(resPromise).catch(err => {
      if (isUnauthorized(err)) {
        const useFakeLogins = !!err.headers('x-nrk-testing');
        preLoginState.save();
        window.location = useFakeLogins ? err.headers('x-nrk-testing') : err.headers('location');
        return nonResolvingPromise();
      }

      return Promise.reject(err);
    });
  });

  preLoginState.restore(url => store.dispatch(gotoUrl(url)));
}
