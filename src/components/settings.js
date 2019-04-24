const { html, Component } = require('htm/preact');
const { dispatch } = require('../lib/state/zero-fux');
const { dialog } = require('electron').remote;

class Settings extends Component {
  onClickHandler = async () => {
    const path = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    dispatch({ type: 'savePathToPosts', payload: path[0] });
  };

  render(props) {
    const { pathToPosts } = props;
    return html`
      <div class="settings fill-viewport">
        <h1>Settings</h1>
        <input type="text" value=${pathToPosts} readonly />
        <button onClick=${this.onClickHandler}>
          Set path to Markdown files
        </button>
        <p class="description">
          Set the path to the folder that contains your Markdown files for your
          blog.
        </p>
      </div>
    `;
  }
}

module.exports = Settings;
