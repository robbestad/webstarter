import Component from 'inferno-component';
import Inferno from 'inferno';
import {connect} from 'inferno-mobx'

@connect(["content"])
export default class Main extends Component {
  render() {
    const {content} = this.props;
    const {key} = this.props.params;
    const json = content.get()[key];

    return <div>
      <h2>{json.title}</h2>
      <p>
        {json.content}
      </p>
      <p>
        We have:
      </p>
      <ul>
        <li>
          @observable – a property whose changes observers subscribe to
        </li>
        <li>
          @observer – a component whose render() method observes values
        </li>
        <li>
          @computed – a method whose value can be fully derived from observables
        </li>
        <li>
          @action – a method that changes state, analogous to a Redux reducer
        </li>
        <li>
          @inject – a decorator that injects global stores into a component’s props
        </li>
      </ul>
      <p>
        That’s basically all you need to know. Once your component is an @observer, you never have to worry about what
        it’s observing. MobX ensures it reacts only to the values that it uses during rendering.
      </p>
    </div>
  }


}
