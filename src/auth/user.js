import http from '../services/http';
import user from '../domain/user';

module.exports = {
  fetchCurrentUser () {
    return http.get('/api/me/')
      .then(result => {
        debugger;
      });
  }
};
