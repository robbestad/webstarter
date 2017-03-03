const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import Component from 'inferno-component';
import {connect} from 'inferno-mobx'

@connect(['counter', 'eventLog'])
export default class Main extends Component {
  render() {
    const {counter, eventLog} = this.props;
    eventLog.setEvent('Hit edit.jsx ' + new Date());
    let count = eventLog.getEvents().peek().length;

    return t('div', null,
      t('h2', null, 'Hello dear user ....:)'),
      t('div', null, `${count}`),
    );
  }

}
