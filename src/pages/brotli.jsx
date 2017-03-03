import Component from 'inferno-component';
import Inferno from 'inferno';

export default class Main extends Component {
  render() {
    return <div>
      <h2>Brotli</h2>
      <p>
        Brotli is a new compression algorithm optimized for the web, in particular small text documents. Brotli decompression is at least as fast as for gzip while significantly improving the compression ratio. The price we pay is that compression is much slower than gzip. Brotli is therefore most effective for serving static content such as fonts and html pages.
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
