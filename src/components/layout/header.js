import Inferno from 'inferno'
import Component from 'inferno-component'
import config from '../../config/index';
import {Link} from 'inferno-router';
import {connect} from 'inferno-mobx'
const React = require('react');
const t = React.createElement;
const {div} = React.DOM;
const Logo = require('../logo');
const UserMenu = require('../userMenu');

export default class Header extends Component {
  render() {
    return (
      div({className: 'dark logo-bar'},
        div({className: 'row tight-s'},
          div({className: 'radioarkiv-logo'},
            t(Logo)
          ),
          div({className: 'user-menu'},
            t(UserMenu)
          )
        ),
      )
    );
  }
}

