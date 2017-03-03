import requestCreator from '../components/helpers/request'
import Common from '../stores/common'
import Counter from '../stores/counter'
import EventLog from '../stores/eventLog'
import Content from '../stores/content'

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
    counter: new Counter(),
    content: new Content(request, state.content),
    eventLog: new EventLog(),
    common: new Common(request, state.common),
  }
}

// Initialize actions and state
export default typeof window !== 'undefined' ? createStores(window.__STATE) : createStores

