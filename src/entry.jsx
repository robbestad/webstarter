import Snap from './camera.jsx';
import Find from './findFace.jsx';
import Inferno from 'inferno';
const t = require('inferno-create-element');
import { Router, Route, Link } from 'inferno-router';
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();
import styles from './app.css';


function App({ children }) {
  return t('div', null,
    t('h1', null, 'Facer'),
    t('ul', null,
      t('li', null, t(Link, { to: '/camera' }, 'Go to camera')),
      t('li', null, t(Link, { to: '/identify' }, 'Route to identify'))
    ),
    t('img', { className: 'myimg' }, ' '),
    t('div', null, children ? children : null)
  );
}

const mount = () => Inferno.render((
  t(Router, { history: browserHistory },
    t(Route, { component: App },
      t(Route, { path: '/camera', component: Snap }),
      t(Route, { path: '/identify', component: Find }),
    )
  )
), document.getElementById('root'));


if (module.hot) {
  module.hot.accept(() => {
    mount();
  });
  module.hot.dispose((data) => {
    // dispose();
  });
}
mount();