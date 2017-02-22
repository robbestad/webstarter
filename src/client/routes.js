import Inferno from 'inferno'
import {Route, IndexRoute} from 'inferno-router'
import Layout from '../components/layout/layout.js'
import NotFound from '../components/layout/404.js'
import Sub from '../pages/about';
// import App from '../components/app'

export default function () {
  debugger;
  return (
    <Route component={ Layout }>
      {/*<IndexRoute component={ App }/>*/}
      <Route path="/page/about" component={ Sub }/>
      <Route path="*" component={ NotFound }/>
    </Route>
  )
}
