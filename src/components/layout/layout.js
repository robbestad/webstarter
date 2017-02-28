import Inferno from 'inferno'
import Component from 'inferno-component'
import config from '../../config/index';
import {Link} from 'inferno-router';
import {connect} from 'inferno-mobx'
import Header from './header';

@connect(['klipp'])
export default class Layout extends Component {
  render({children}) {
    return <div className="">
      <Header/>
      <div className="content-container">
        <div className="mod tight-s">
          {children}
        </div>
      </div>
    </div>
  }
}

