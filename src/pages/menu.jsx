const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import * as constants from "../constants";
import {connect, observer} from 'inferno-mobx'
import Inferno from 'inferno'

export default connect((props, context) => {
  const contentStore = context.mobxStores[constants.CONTENTSTORE];
  return <div className="col-12">
    <div className="content">
      <ul className="menu-list">
        {
          Object.keys(contentStore.get()).map(item => <li className="menu-list-item"><Link
            to={`/page/view/${item}`}>{item}</Link></li>)
        }
      </ul>
    </div>
  </div>
});
