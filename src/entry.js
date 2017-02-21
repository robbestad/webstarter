import Sub from './components/sub.js';
import Inferno from 'inferno';
import {Router, Route, Link} from 'inferno-router';
import {createBrowserHistory} from 'history';
const browserHistory = createBrowserHistory();
import './assets/style/entry.css';
require('offline-plugin/runtime').install();
import config from './config';

if (module.hot) {
  require('inferno-devtools')
}
function App({children}) {
  return <div className="grid">
    <div className="row">
      <div className="col-4 border-left border-bottom">
        <div className="content">
          <div className="font-semi-bold font-size-xxl">{config.title}</div>
        </div>
      </div>
      <div className="col-3 border-left border-bottom">
        <div className="content">
          <div className="font-semi-bold font-size-l italic">Menypunkt 1</div>
        </div>
      </div>
      <div className="col-3 border-left border-bottom">
        <div className="content ">
          <div className="font-semi-bold font-size-l italic">Menypunkt 2</div>
        </div>
      </div>
      <div className="col-2 border-left border-bottom border-right">
        <div className="content ">
          <div className="font-semi-bold font-size-l italic">HELP?</div>
        </div>
      </div>

    </div>
    <div className="row">
      <div className="col-4">
        <div className="content">
          <Link to="/sub">Hello my child</Link>

        </div>
      </div>
      <div className="col-8">
        <div className="content">
          {children ? children : null}
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-6">
        <div className="content">

        </div>
      </div>
      <div className="col-6">
        <div className="content">

        </div>
      </div>
    </div>
  </div>
}

if (module.hot) {
  module.hot.accept();
}
Inferno.render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/sub" component={Sub}/>
    </Route>
  </Router>
), document.getElementById('root'));
