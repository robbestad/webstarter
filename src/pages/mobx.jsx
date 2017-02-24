import Component from 'inferno-component';
import Inferno from 'inferno';

export default class Main extends Component {
  render() {
    return <div>
      <h2>Mobx</h2>
      <p>
      MobX implements the ideas of reactive programming. There are values that are observable and functions that react when those values change. MobX ensures only the minimal possible set of observers is triggered on every change.
      </p>
      <p>
      We have:
      </p>
      <ul>
        <li>
          @observable – a property whose changes observers subscribe to
        </li>
      <li>
          @observer – a component whose render() method observes values
      </li>
      <li>
        @computed – a method whose value can be fully derived from observables
      </li>
      <li>
        @action – a method that changes state, analogous to a Redux reducer
      </li>
      <li>
        @inject – a decorator that injects global stores into a component’s props
      </li>
      </ul>
      <p>
        That’s basically all you need to know. Once your component is an @observer, you never have to worry about what it’s observing. MobX ensures it reacts only to the values that it uses during rendering.
      </p>
    </div>
  }


}
