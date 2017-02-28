const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import Component from 'inferno-component';
import { connect } from 'inferno-mobx'

// @connect(['counter'])
export default class Sub extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return t('div', null,
      t('div', null, t(Link, {to: '/'}, 'Close me!')
      ));
  }


}
