import Inferno from 'inferno';
import {Router, match} from 'inferno-router';
import {createBrowserHistory} from 'history';
import './assets/style/entry.css';
require('offline-plugin/runtime').install();
const onEnter = require('./components/helpers/onEnter');
import stores from './client/stores'
import App from './components/app'
import routes from './client/routes';
import autorun from './autorun'

// React to changes
autorun(stores);

// Fetch data on route change
const container = document.getElementById('root');
window.browserHistory = createBrowserHistory();

window.browserHistory.listen(location => {
  onEnter(match(routing, location), stores)
});

if (module.hot) {
  require('inferno-devtools');
  module.hot.accept();
}

Inferno.render(<App stores={stores}>
  <Router history={window.browserHistory}>
    {routes(stores)}
  </Router>
</App>, container);