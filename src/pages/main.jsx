const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import Component from 'inferno-component';
import {connect} from 'inferno-mobx'

@connect(['counter'])
export default class Main extends Component {
  render() {
    const { counter } = this.props;
    return t('div', null,
      t('h2', null, 'Hello dear user :)'),
      t('div', null, `${counter.getCount()}`),
    );
  }


}
