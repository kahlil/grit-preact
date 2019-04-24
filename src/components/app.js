const { html, Component } = require('htm/preact');

const Editor = require('./Editor');
const FileNavigator = require('./FileNavigator');
const Notifications = require('./Notifications');
const Settings = require('./Settings');
const Empty = require('./Empty');

const { appRoot } = require('../lib/appRoot');
const electronStore = require('../lib/electronStore');

global.electronStore = electronStore;

const directory = electronStore.get('pathToPosts');

// electronStore.clear();

const routes = { Editor, Settings, Empty };

class App extends Component {
  state = {
    slot: {
      component: directory ? 'Empty' : 'Settings',
      props: {},
    },
    showFileNavigator: false,
    notifications: [],
  };

  componentDidMount() {
    appRoot.on('stateUpdate', ({ detail: action }) => {
      const {
        slot,
        showFileNavigator,
        pathToPosts,
        notifications,
      } = action.payload;
      this.setState({
        slot: { ...slot },
        showFileNavigator: showFileNavigator,
        pathToPosts: pathToPosts,
        notifications: notifications,
      });
    });
  }

  logContent(content) {
    console.log(content);
  }

  render(_, state) {
    const { notifications, showFileNavigator, pathToPosts, slot } = state;
    return html`
      <div>
        <div class="drag-bar" />
        <${Notifications} notifications=${notifications} />
        <${FileNavigator}
          show=${showFileNavigator}
          pathToPosts=${pathToPosts}
        />
        <div class=${showFileNavigator ? 'blurred' : ''}>
          <${routes[slot.component]} ...${slot.props} />
        </div>
      </div>
    `;
  }
}

module.exports = App;
