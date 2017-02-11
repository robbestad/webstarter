import {observable, action} from 'mobx'

class TitleStore {
  @observable title;

  constructor(title = 'Hello World') {
    this.title = title;
  }

  @action setTitle = (title) => {
    this.title = title;
  };
}
export default TitleStore;