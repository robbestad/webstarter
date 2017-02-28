import Inferno from 'inferno';
import {Router, match} from 'inferno-router';
import {createBrowserHistory} from 'history';
import './assets/style/origo.css';
import './assets/style/override.css';
import { Provider } from 'inferno-mobx'
import * as auth from './auth';
// import {testConnection} from './actions/connection';

require('offline-plugin/runtime').install();
const onEnter = require('./components/helpers/onEnter');
import autorun from './autorun'
import stores from './client/stores'
import routes from './client/routes';
import App from './components/app'

// React to changes
autorun(stores);

// auth.configure();
// const fetchCurrentUser = require('./auth/user').fetchCurrentUser;

// testConnection();

// Fetch data on route change
const container = document.getElementById('root');
window.browserHistory = createBrowserHistory();
const routing = routes(stores);

window.browserHistory.listen(location => {
  onEnter(match(routing, location), stores)
});

if (module.hot) {
  require('inferno-devtools');
  module.hot.accept();
}

Inferno.render(<Provider {...stores} >
    <Router history={window.browserHistory}>
      {routing}
    </Router>
  </Provider>
  , container);
