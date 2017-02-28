const t = require('inferno-create-element');
import Inferno from 'inferno'
import Component from 'inferno-component'

export default class Logo extends Component {
  render() {
    return (
      t('div', {className: 'mod'},
        t('div', {className: 'text-link logo-link'},
          t('div', {className: 'radioarkiv-logo'},
            t('img', {className: 'mrs', src: '/assets/nrk.svg', width: '58px'}),
            t('span', {}, 'klipp-admin')
          )
        ),
      )
    );
  }
};
