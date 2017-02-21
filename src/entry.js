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
          <div className="font-semi-bold font-size-l italic">{config.title}</div>
        </div>
      </div>
      <div className="col-3 border-left border-bottom">
        <div className="content ">
          <div className="font-semi-bold font-size-l italic">{config.title}</div>
        </div>
      </div>
      <div className="col-2 border-left border-bottom border-right">
        <div className="content ">
          <div className="font-semi-bold font-size-l italic">4</div>
        </div>
      </div>

    </div>
    <div className="row">
      <div className="col-3">
        <div className="content font-style-regular italic">
          {new Array(53).fill("").map(() => {
            return <span>test. </span>
          })}
        </div>
      </div>
      <div className="col-9">
        <div className="content">
          {new Array(53).fill("").map(() => {
            return <span>test. </span>
          })}

        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-4">
        <div className="content">
          <Link to="/sub">Go deep</Link>

        </div>
      </div>
      <div className="col-8">
        <div className="content"></div>
      </div>
    </div>
    <div className="row">
      <div className="col-6">
        <div className="content">
          {new Array(553).fill("").map(() => {
            return <span>test. </span>
          })}

        </div>
      </div>
      <div className="col-6">
        <div className="content"></div>
      </div>
    </div>
  </div>
}
/*


 return <div className="container">
 <header>
 <div className="">
 <div className="font-semi-bold font-size-xxl italic">{config.title}</div>
 </div>
 <div className="">
 <a className="font-style-extra-light font-size-l italic">ABOUT</a>
 </div>
 <div className="">
 <a className="">MENU</a>
 </div>
 </header>
 <div className="main">
 <Link to="/sub">Go deep</Link>
 {children ? children : null}
 {new Array(5).fill("").map(() => {
 return <div>test</div>
 })}
 </div>
 <div className="footer">
 Footer Content
 </div>
 </div>
 */

if (module.hot) {
  module.hot.accept();
}
Inferno.render((
  <Router history={browserHistory}>
    <Route component={App}/>
    <Route path="/sub" component={Sub}/>
  </Router>
), document.getElementById('root'));
