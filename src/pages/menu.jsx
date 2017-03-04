const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import * as constants from "../constants";
import {connect, observer} from 'inferno-mobx'

export default connect((props, context) => {
  const contentStore = context.mobxStores[constants.CONTENTSTORE];
  return t('div', {className: 'col-12'},
    t('div', {className: 'content'},
      t('ul', {className: 'menu-list'},
        Object.keys(contentStore.get()).map(item => t('li', {className: 'menu-list-item'}, t(Link,
          {to: `/page/view/${item}`}, item)
          )
        )))
  );
});
