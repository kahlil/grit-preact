const { html, Component } = require('htm/preact');
const directoryListing = require('../lib/fs/directoryListing');
const debounce = require('../lib/debounce');
const { dispatch } = require('../lib/state/zeroFux');
const FileList = require('./FileList');

class FileNavigator extends Component {
  handleInput() {
    if (!this.input) return;
    const input = this.input.value;
    dispatch({ type: 'filterFileList', payload: input });
  }

  handleFileListClick = event => {
    const listItem = event.target;
    const action = listItem.dataset.action;
    dispatch({
      type: action,
      payload: action === 'openFile' ? listItem.innerText : this.input.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.show && prevProps.show !== this.props.show) {
      this.input.focus();
      this.input.value = '';
    }
  }

  render(props) {
    const handleKeyPress = debounce(event => this.handleInput(event), 100);
    return html`
      <div class=${`file-navigator${props.show ? '' : ' is-hidden'}`}>
        <div class="file-navigator__main">
          <section>
            <input
              class="mousetrap"
              placeholder="type a file name"
              onKeyDown=${event => handleKeyPress(event)}
              ref=${input => (this.input = input)}
            />
          </section>
          <${FileList}
            fileList=${this.props.fileList}
            handleClick=${this.handleFileListClick}
          />
        </div>
      </div>
    `;
  }
}

module.exports = FileNavigator;
