import Sub from './components/sub.js';
import Inferno from 'inferno';
import {Router, Route, Link} from 'inferno-router';
import {createBrowserHistory} from 'history';
const browserHistory = createBrowserHistory();
import './assets/style/entry.css';

if (module.hot) {
  require('inferno-devtools')
}
function App({children}) {
  return <div>
    <h1>My App</h1>
    <ul>

      <li><Link to="/sub">Go deep</Link></li>
    </ul>
    {children ? children : null}
  </div>
}

if (module.hot) {
  module.hot.accept();
}

Inferno.render((
  <Router history={browserHistory}>
    <Route component={App}/>
    <Route path="/sub" component={Sub}/>
  </Router>
), document.getElementById('root'));

