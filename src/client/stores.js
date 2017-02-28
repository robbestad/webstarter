import requestCreator from '../components/helpers/request'
import Common from '../stores/common'
import Klipp from '../stores/klipp'

// All our stores are listed here
function createStores(state, token) {

  if (!state) {
    state = {
      common: {
        hostname: 'http://localhost:5001'
      }
    };
  }

  const request = requestCreator(state.common.hostname, token);
  return {
    klipp: new Klipp(request, state.common),
    common: new Common(request, state.common),
  }
}

// Initialize actions and state
export default typeof window !== 'undefined' ? createStores(window.__STATE) : createStores

