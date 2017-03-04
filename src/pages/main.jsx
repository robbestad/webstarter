const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import Component from 'inferno-component';
import {connect} from 'inferno-mobx'
import menu from './menu';

@connect(['counter', 'eventLog'])
export default class Main extends Component {
  constructor(props) {
    super(props);
    props.eventLog.setEvent('Hit main.jsx ' + new Date());

  }

  render() {
    const {eventLog} = this.props;
    let count = eventLog.getEvents().peek().length;

    return t('div', {},
      t('div', {className: 'col-12'},
        t('div', {className: 'content'},
          t('p', {className: 'inner-left'}, 'Welcome')
        )),
      t(menu)
    )
  }

}
