import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

@connect(['englishStore', 'frenchStore'])
export default class Main extends Component {
  render({ englishStore, frenchStore }) {
    return <div>
      <p>{ englishStore.title }</p>
      <p>{ frenchStore.title }</p>
    </div>
  }
}

