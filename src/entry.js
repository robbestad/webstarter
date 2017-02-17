import Sub from './components/sub.js';
import Inferno from 'inferno';
import {Router, Route, Link} from 'inferno-router';
import {createBrowserHistory} from 'history';
const browserHistory = createBrowserHistory();
import './assets/style/entry.css';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

if ('serviceWorker' in navigator) {
  runtime.register();
}

if (module.hot) {
  require('inferno-devtools')
}
function App({children}) {
  return <div>
    <h1>My app</h1>
    <ul>

      <li><Link to="/sub">Go to my sub-page</Link></li>
    </ul>
    {children ? children : null}
  </div>
}

Inferno.render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/sub" component={Sub}/>
    </Route>
  </Router>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
  require('inferno-devtools')
}
