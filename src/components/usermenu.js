const t = require('inferno-create-element');
// import Inferno from 'inferno'
import Component from 'inferno-component'

export default class Logo extends Component {
  render() {
    return (
      t('div', {className: 'mod'},
      )
    );
  }
};
