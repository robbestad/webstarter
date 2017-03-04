import Inferno from 'inferno'
import Component from 'inferno-component'
import config from '../../config/index';
import {Link} from 'inferno-router';
import {connect} from 'inferno-mobx'
import * as constants from "../../constants";

@connect(["counter", constants.CONTENTSTORE])
export default class Layout extends Component {
  constructor(props) {
    super(props);
    props[constants.CONTENTSTORE].getContent();
  }

  render({children}) {
    const {counter} = this.props;
    const {key} = this.props.params;
    const contentStore = this.props[constants.CONTENTSTORE];

    return <div className="grid">

      <div className="row">
        <div className="col-12 border-left border-bottom">
          <div className="content">
            <div className="font-semi-bold font-size-xxl">
              <div className="inner">{config.title}</div>
            </div>
          </div>
        </div>
      </div>

      {children ? children : null}

    </div>
  }
}

