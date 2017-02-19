const t = require('inferno-create-element');
import {Link} from 'inferno-router';

export default function Sub() {
  return t('div', null,
    t('h2', null, 'My Sub Page'),
    t('div', null, 'Everything is A-OK!'),
    t('br'),
    t('div', null, t(Link, {to: '/'}, 'Take me back!')
    )
  );
}
