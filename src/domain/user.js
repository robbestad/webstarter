import props from '../utils/props';
import {isEmpty} from 'lodash';

const none = props.define({}, {
  isNone: true
});

export default {
  none () {
    return none;
  },

  of (data) {
    if (isEmpty(data)) {
      return none;
    }

    const principal = data.principal || {};
    const gravatar = data.gravatar || {};
    const id = data.name || {};

    return props.define({}, {
      name: principal.name,
      userid: id,
      thumbnailUrl: gravatar.thumbnailUrl
    });
  }
};
