const t = require('inferno-create-element');
import {Link} from 'inferno-router';

export default function Sub() {
  return t('div', null,
           t('h2', null, 'My Sub Page'),
           t('div', null, 'Everything is A-OK in depppsub page land'),
           t('div', null, t(Link, {to: '/'}, 'I want to get off this page!')
            ),
          );
}
