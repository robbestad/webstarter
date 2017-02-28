const t = require('inferno-create-element');
import {Link} from 'inferno-router';
import * as constants from '../../domain/constants';
import Component from 'inferno-component';
import {connect} from 'inferno-mobx'
import Inferno from 'inferno';
import {icon} from '@nrk/origo-react';

@connect(['klipp'])
export default class SeriesCreate extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.klipp.createNewSeries({
      title: e.target.title.value,
      description: e.target.description.value,
      masterSystem: e.target.masterSystem.value,
    }).then(res => {
      const id = res.toString().split('serie/')[1];
      this.context.router.push(`/pages/series/view/${id}`);
    })
  }

  render() {
    return t('div', null,
      t('div', {className: 'mod'},
        t('form', {onSubmit: this.handleSubmit.bind(this)},
          t('input', {type: 'hidden', value: constants.MASTERSYSTEM, name: 'masterSystem'}),
          t('label', {htmlFor: 'title'}, 'Tittel'),
          t('span', {className: 'bi focusable'},
            t('input', {
              type: 'input',
              name: 'title',
              className: 'bi-input focusable-main',
              id: 'title'
            }, ''),
            icon('title', {role: 'presentation'})
          ),
          t('br'),
          t('label', {htmlFor: 'description'}, 'Beskrivelse'),
          t('span', {className: 'bi focusable bi-mega'},
            t('textarea', {
              className: 'bi-input focusable-main ',
              name: 'description',
              id: 'description'
            })
          ),
          t('br'),
          t('input', {className: 'btn btn-primary', type: 'submit', value: 'Opprett'})
        ),
      ),
      t('div', null, t(Link, {to: '/'}, 'Close me!')
      )
    );
  }


}
