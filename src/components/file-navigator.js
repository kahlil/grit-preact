const { html, Component } = require('htm/preact');
const directoryListing = require('../lib/file-system/directory-listing');
const debounce = require('../lib/debounce');
const { dispatch } = require('../lib/state/zero-fux');
const FileList = require('./file-list');

class FileNavigator extends Component {
  componentDidMount() {
    this.getFileList();
  }

  componentDidUpdate(prevProps) {
    const { pathToPosts, show } = this.props;
    const isPathUpdated = prevProps.pathToPosts !== pathToPosts;
    const wasMadeVisible = prevProps.show !== show && show === true;
    if (isPathUpdated || wasMadeVisible) {
      this.getFileList();
    }
  }

  async getFileList() {
    const directory = this.props.pathToPosts;
    if (directory) {
      const fileNames = await directoryListing(directory);
      this.input.focus();
      this.setState({ directory, fileNames, filteredFileNames: fileNames });
    }
  }

  handleInput() {
    if (!this.input) return;
    const input = this.input.value;
    const filteredFileNames = input
      ? this.state.fileNames.filter(fileName => fileName.includes(input))
      : this.state.fileNames;
    this.setState({ filteredFileNames });
  }

  handleFileListClick = event => {
    const listItem = event.target;
    const action = listItem.dataset.action;
    dispatch({
      type: action,
      payload: action === 'openFile' ? listItem.innerText : this.input.value,
    });
  };

  render(props) {
    const handleKeyPress = debounce(event => this.handleInput(event), 100);
    return html`
      <div class=${`file-navigator${props.show ? '' : ' is-hidden'}`}>
        <div class="file-navigator__main">
          <section>
            <input
              placeholder="type a file name"
              onKeyDown=${event => handleKeyPress(event)}
              ref=${input => (this.input = input)}
            />
          </section>
          <${FileList}
            fileNames=${this.state.filteredFileNames}
            handleClick=${this.handleFileListClick}
          />
        </div>
      </div>
    `;
  }
}

module.exports = FileNavigator;
