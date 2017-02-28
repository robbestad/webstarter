const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import {isEditable} from '../domain/isEditable';
import Component from 'inferno-component';
import {connect} from 'inferno-mobx'
import React from 'react';
import Inferno from 'inferno';
const {div, h1} = React.DOM;
import {icon} from '@nrk/origo-react';

@connect(['klipp'])
export default class Main extends Component {
  handleInputSearch(e) {
    this.props.klipp.getSeriesByTitle(e.target.value.toString().trim());
  }

  editItem(id) {
    this.context.router.push(`/pages/series/edit/${id}`);
  }

  render() {
    const {klipp} = this.props;
    console.log(klipp.items);
    return div({className: 'mtl'},
      div({className: 'row'},
        div({className: 'col c12'},
          div({className: 'mod'},
            div({className: 'mod right'},
              <Link className="btn btn-primary" to={`/pages/series/create`}>Opprett ny serie</Link>
            ),
            h1({className: 'left'}, 'Administrasjon'),
            div({className: 'clear'}, `Denne siden er forbeholdt et utvalg administrative brukere. 
            Hvis du ikke ser noen verktøy på denne siden betyr det at du ikke har tilgang.`)
          ),
        )),
      div({className: 'row'},
        div({className: 'col c12'},
          div({className: 'mod'},
            t('h1', null, 'Søk'),
            t('span', {className: 'bi focusable'},
              t('input', {
                type: 'search', className: 'bi-input focusable-main',
                onKeyDown: this.handleInputSearch.bind(this)
              }, ''),
              icon('search', {role: 'presentation'})
            ),
            t('div', {className: 'container text-s'}, ''),
            klipp.items.length ? <div className="row mod">
              <div className="col c5">
                <strong>Tittel</strong>
              </div>
              <div className="col c5">
                <strong>Eiende system</strong>
              </div>
              <div className="col c2">
                <strong>Handling</strong>
              </div>
            </div> : null,
            klipp.items.map(item=> {
              const disabled = isEditable(item);
              return <div className="row mod">
                <div className="col c5">
                  <Link to={`/pages/series/view/${item.id}`}>{item.title}</Link>
                </div>
                <div className="col c5">
                  {item.masterSystem.replace('http://authority.nrk.no/system/', '')}
                </div>
                <div className="col c2">
                  <input type="button" disabled={disabled ? "disabled" : ''}
                         className={`btn ${disabled ? "btn-disabled" : ''}`}
                         value="Rediger" onClick={!disabled && this.editItem.bind(this, item.id)}/>
                </div>
              </div>
            })
          )
        )
      )
    )
      ;
  }
}


/*
 const Main = observer(({ klipp }) =>
 t('div', null,
 t('h2', null, 'I am Main')
 )
 );

 export default Main;

 */
