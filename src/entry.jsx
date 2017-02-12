import Snap from './camera.jsx';
import Find from './findFace.jsx';
import Inferno from 'inferno';
const t = require('inferno-create-element');
import { Router, Route, Link } from 'inferno-router';
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

function App({ children }) {
  return t('div', null,
    t('h1', null, 'Facer'),
    t('ul', null,
      t('li', null, t(Link, { to: '/camera' }, 'Route to camera')),
      t('li', null, t(Link, { to: '/identify' }, 'Route to identify'))
    ),
    t('div', null, children ? children : null)
  );
}

Inferno.render((
  t(Router, { history: browserHistory },
    t(Route, { component: App },
      t(Route, { path: '/camera', component: Snap }),
      t(Route, { path: '/identify', component: Find })
    )
  )
), document.getElementById('root'));
