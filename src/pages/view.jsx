import Component from 'inferno-component';
import Inferno from 'inferno';
import {connect} from 'inferno-mobx'
import * as constants from "../constants";
import {asString} from '../components/helpers/render';

@connect([constants.CONTENTSTORE])
export default class Main extends Component {
  render() {
    const {content} = this.props;
    const {key} = this.props.params;
    const json = content.get()[key];

    return <div>
      <h2>{json.title}</h2>
      <p>
        {asString(json.content)}
      </p>
    </div>
  }

}