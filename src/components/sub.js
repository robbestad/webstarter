const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import Component from 'inferno-component';

export default class Sub extends Component {
  constructor(props) {
    super(props);
    this.allowClick = true;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.allowClick) {
      console.log('click', new Date()); // eslint-disable-line no-console
    }
    this.allowClick = false;
    setTimeout(() => {
      this.allowClick = true;
    }, 750)
  }

  render() {
    return t('div', null,
      t('h2', null, 'My Sub Page'),
      t('div', null, 'Everything is A-OK!'),
      t('input', {type: 'button', onClick: this.handleClick, value: 'Click me'}),
      t('div', null, t(Link, {to: '/'}, 'Close me!')
      ));
  }


}
