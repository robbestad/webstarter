import Inferno from 'inferno'
import {Route, IndexRoute} from 'inferno-router'
import Layout from '../components/layout/layout.js'
import NotFound from '../components/layout/404.js'
import Sub from '../pages/menu';
import View from '../pages/view';
import Edit from '../pages/edit';
import Main from '../pages/main'

export default function () {
  return (
    <Route component={ Layout }>
      <IndexRoute component={ Main }/>
      <Route path="/page/menu" component={ Sub }/>
      <Route path="/page/view/:key" component={ View }/>
      {process.env.NODE_ENV === "development" && <Route path="/page/edit/:key" component={ Edit }/>}
      <Route path="*" component={ NotFound }/>
    </Route>
  )
}
