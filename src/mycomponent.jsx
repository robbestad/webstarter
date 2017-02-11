import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

@connect(['titleStore'])
export default class Main extends Component {
  render({ titleStore }) {
    return <div>
      <p>{ titleStore.title }</p>
    </div>
  }
}

