import requestCreator from '../components/helpers/request'
import Common from '../stores/common'
import Counter from '../stores/counter'

// All our stores are listed here
function createStores(state, token) {
  const request = requestCreator(state.common.hostname, token);
  return {
    common: new Common(request, state.common),
    counter: new Counter(request, state.counter)
  }
}

// Initialize actions and state
export default process.env.BROWSER ? createStores(window.__STATE) : createStores
