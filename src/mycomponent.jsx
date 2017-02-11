import Inferno from 'inferno'
import Component from 'inferno-component'
import { connect } from 'inferno-mobx'

@connect(['titleStore'])
export default class Main extends Component {
  componentDidMount(){
    setInterval(()=>{
      this.props.titleStore.setTitle(new Date().toString())
    },1000)
  }

  render({ titleStore }) {
    return <div>
      <p>{ titleStore.title }</p>
    </div>
  }
}

