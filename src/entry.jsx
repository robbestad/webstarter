import Inferno from 'inferno'
import {Provider} from 'inferno-mobx'
import MyComponent from './mycomponent'
import TitleStore from './stores/title';

Inferno.render(<Provider titleStore={  new TitleStore('Web Starter!') } >
  <MyComponent/>
</Provider>, document.getElementById('root'));
