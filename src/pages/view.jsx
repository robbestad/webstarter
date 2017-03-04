import Component from 'inferno-component';
import Inferno from 'inferno';
import {connect} from 'inferno-mobx'
import * as constants from "../constants";
import {asString} from '../components/helpers/render';
import {Link} from 'inferno-router';

@connect([constants.CONTENTSTORE])
export default class Main extends Component {
  render() {
    const {content} = this.props;
    const {key} = this.props.params;
    const json = content.get()[key];

    return <div>
      <div className="row">
        <div className="col-12 ">
          <div className="content">
            <div className="inner-left">
              <h2>{json && json.title}</h2>
              {process.env.NODE_ENV === "development" && <Link to={`/page/edit/${key}`}>Edit</Link>}
              <p>
                {json && asString(json.content)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 border-top border-left border-bottom ">
          <div className="content">
            <div className="font-semi-bold font-size-l italic">
              <div className="inner"><Link to={`/page/menu`}>Back</Link><br/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

}
