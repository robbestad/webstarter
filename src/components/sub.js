import Inferno from 'inferno';
const t = require('inferno-create-element');

export default function Sub() {
  return t('div', null,
    t('h2', null, 'My Sub Page')
  );
}
