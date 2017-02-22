import Inferno from 'inferno'
import Component from 'inferno-component'
import { Provider } from 'inferno-mobx'

/**
 * Here you have define other providers
 * such as for redux
 */
export default class App extends Component {
  render({ stores, children }) {
    if (!children) {
      return <div/>
    }
    return <div>
      <Provider counter={stores.counter} common={stores.common}>
        {children}
      </Provider>
    </div>
  }
}
