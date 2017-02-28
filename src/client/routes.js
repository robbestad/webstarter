import Inferno from 'inferno'
import {Route, IndexRoute} from 'inferno-router'
import Layout from '../components/layout/layout.js'
import NotFound from '../components/layout/404.js'
import Main from '../pages/main'
import SeriesView from '../pages/series/view.jsx';
import SeriesCreate from '../pages/series/create.jsx';
import SeriesEdit from '../pages/series/edit.jsx';

export default function () {
  return (
    <Route component={ Layout }>
      <IndexRoute component={ Main }/>
      <Route path="/pages/series/edit/:id" component={ SeriesEdit }/>
      <Route path="/pages/series/view/:id" component={ SeriesView }/>
      <Route path="/pages/series/create" component={ SeriesCreate }/>
      <Route path="*" component={ NotFound }/>
    </Route>
  )
}
