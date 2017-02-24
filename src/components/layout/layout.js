import Inferno from 'inferno'
import Component from 'inferno-component'
import config from '../../config/index';
import {Link} from 'inferno-router';
import {connect} from 'inferno-mobx'

@connect(['counter'])
export default class Layout extends Component {
  render({children}) {
    const {counter} = this.props;
    return <div className="grid">

      <div className="row">
        <div className="col-large-4 col-medium-12 col-small-12 border-left border-bottom">
          <div className="content">
            <div className="font-semi-bold font-size-xxl">
              <div className="inner-first">{config.title}</div>
            </div>
          </div>
        </div>
        <div className="col-large-4 border-left border-bottom hide-medium hide-small">
          <div className="content">
            <div className="font-style-regular font-size-l">
              <div className="inner">Your are<br/>visitor <span
                className="font-style-extra-bold italic">#{counter.getCount()}</span></div>
            </div>
          </div>
        </div>
        <div className="col-large-4 border-left border-bottom hide-medium hide-small">
          <div className="content ">
            <div className="font-semi-bold font-size-l italic">
              <div className="inner"><Link to="page/speed">SPEED IS KEY</Link><br/></div>
            </div>
          </div>
        </div>


      </div>
      <div className="row">
        <div className="col-4 border-left border-bottom ">
          <div className="content">
            <div className="inner-left">
              <p><Link to="/page/about">Hello my child</Link></p>
              <p><Link to="/page/about">An article on something interesting</Link></p>
              <p><Link to="/page/about">Gzip, Brotfli and Zopfli</Link></p>
              <p><Link to="/page/about">React vs Inferno</Link></p>
              <p><Link to="/page/about">Redux or Mobx?</Link></p>
            </div>

          </div>
        </div>
        <div className="col-8 border-left border-bottom border-right">
          <div className="content">
            {children ? children : null}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="hide-large col-medium-12 col-small-12 border-left border-bottom border-right">
          <div className="content">
            <div className="inner">Your are<br/>visitor <span
              className="font-style-extra-bold italic">#{counter.getCount()}</span></div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 border-left border-bottom border-right">
          <div className="content">
            <div className="inner">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cumque deserunt dicta ducimus eaque,
              error iusto magni neque officiis quibusdam quod tempore. Autem consequatur libero minima, quas sequi
              temporibus voluptates!

              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cumque deserunt dicta ducimus eaque,
              error iusto magni neque officiis quibusdam quod tempore. Autem consequatur libero minima, quas sequi
              temporibus voluptates!
            </div>
          </div>
        </div>
      </div>

    </div>
  }
}

