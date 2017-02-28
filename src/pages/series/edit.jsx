const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import Component from 'inferno-component';
import {connect} from 'inferno-mobx'
import Inferno from 'inferno';

@connect(['klipp'])
export default class SeriesView extends Component {
  constructor(props) {
    super(props);

    if (props.params.id)
      props.klipp.getSeriesInfo(props.params.id);
  }

  render() {
    if (!this.props.klipp.currentSeries) return null;
    const {id, title, created, owner, masterSystem, links, description} = this.props.klipp.currentSeries;
    console.log(links);
    return t('div', null,
      <div className="mod">
        <h1>Rediger {title}</h1>

        <div>{description}</div>
        <table className="table">
          <tbody>
          <tr>
            <th><p>Opprettet</p></th>
            <td className="c12"><p>{created}</p></td>
          </tr>
          <tr>
            <th><p>Eiende system</p></th>
            <td className="c12"><p>{masterSystem}</p></td>
          </tr>
          <tr>
            <th><p>Eier</p></th>
            <td className="c12"><p>{owner}</p></td>
          </tr>
          <tr>
            <th><p>Sesonger</p></th>
            <td className="c12"><p>
              {links && links.peek().map(link => {
                return <div>{link.href}</div>
              })}
            </p></td>
          </tr>

          </tbody>
        </table>
      </div>,
      t('div', null, t(Link, {to: '/'}, 'Close me!')
      )
    );
  }


}
