import Inferno from 'inferno'
import {Route, IndexRoute} from 'inferno-router'
import Layout from '../components/layout/layout.js'
import NotFound from '../components/layout/404.js'
import Sub from '../pages/about';
import Main from '../pages/main'

export default function () {
  return (
    <Route component={ Layout }>
      <IndexRoute component={ Main }/>
      <Route path="/page/about" component={ Sub }/>
      <Route path="*" component={ NotFound }/>
    </Route>
  )
}
