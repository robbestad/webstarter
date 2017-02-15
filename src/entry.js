import Sub from './components/sub.js';
import Inferno from 'inferno';
const t = require('inferno-create-element');
import {Router, Route, Link} from 'inferno-router';
import {createBrowserHistory} from 'history';
const browserHistory = createBrowserHistory();
import './scss/entry.scss';

function App({children}) {
  return t('div', null,
    t('h1', null, 'My App!'),
    t('ul', null,
      t('li', null, t(Link, {to: '/sub'}, 'Go to my sub-page')),
    ),
    t('div', null, children ? children : null)
  );
}

Inferno.render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/sub" component={Sub}/>
    </Route>
  </Router>
), document.getElementById('root'));

