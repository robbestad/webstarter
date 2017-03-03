import Component from 'inferno-component';
import Inferno from 'inferno';
import {connect} from 'inferno-mobx'

// import '../assets/style/edit.css';
import * as constants from "../constants";
import {asString, asKey} from '../components/helpers/render';

@connect([constants.CONTENTSTORE])
export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      key: props.params.key ? this.props.params.key : '',
      title: props.params.key ? props.content.getByKey(props.params.key).title : '',
      content: props.params.key ? props.content.getByKey(props.params.key).content : ''
    };
  }

  handleSelect(e) {
    this.setState({
      key: e.target.form.key.value,
      title: this.props.content.getByKey(e.target.form.key.value).title,
      content: this.props.content.getByKey(e.target.form.key.value).content
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const title = e.target[0].value;
    const content = e.target[1].value;

    const key = asKey(title);
    if (!key || !title || !content) {
      return null;
    }

    this.setState({
      key,
      title,
      content
    });

    this.props.content.put(key, {title, content});
    this.context.router.push(`/page/view/${key}`)
  }

  handleChange(e) {
    this.setStateSync({
      [e.target.id]: e.target.value
    })
  }

  handleDelete() {
    this.props[constants.CONTENTSTORE].delete(this.state.key);
  }

  render() {
    const contentStore = this.props[constants.CONTENTSTORE];
    const {key} = this.state;
    const json = contentStore.getByKey(key);

    return <div>
      <form id="contentForm" onSubmit={this.handleSubmit}>
        <p>
          <input id="title" type="text" value={this.state.title}
                 onInput={this.handleChange}
                 className="input-title"/>
        </p>
        <p>
          <textarea id="content" value={this.state.content}
                    onInput={this.handleChange}
                    className="input-textarea"/>
        </p>
        <h3>Forhåndsvisning</h3>
        <p>
          {asString(this.state.content)}
        </p>
        <p>
          <input type="submit" className="input-button" value="Lagre"/>
        </p>
      </form>
      <p>
        <form onSubmit={this.handleDelete}>
          <input type="button" value="Slett" onClick={this.handleDelete} className="delete-button"/>
        </form>
      </p>
    </div>
  }


}
