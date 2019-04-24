const { html, Component } = require('htm/preact');
const CodeMirror = require('codemirror');
const debounce = require('../lib/debounce');
const { dispatch } = require('../lib/state/zero-fux');

const CloseButton = ({ onClickHandler }) =>
  html`
    <button class="close-button" onClick=${onClickHandler}>
      <span class="close-button--x">×</span>
    </button>
  `;

class Editor extends Component {
  componentDidMount() {
    this.codeMirrorEditor = CodeMirror(this.editorEl, {
      mode: 'yaml-frontmatter',
      theme: 'base16-dark',
      lineWrapping: true,
      viewportMargin: Infinity,
      autofocus: true,
    });

    this.codeMirrorEditor.on('change', event => {
      debounce(() => {
        dispatch({
          type: 'saveDocument',
          payload: this.codeMirrorEditor.getValue(),
        });
        console.log(event, 'file has changed');
      }, 400)();
    });

    this.codeMirrorEditor.setOption('extraKeys', {
      'Cmd-O': () => {
        dispatch({ type: 'openFileNavigator' });
      },
    });

    this.codeMirrorEditor.setValue(this.props.content);
  }

  componentDidUpdate() {
    this.codeMirrorEditor.setValue(this.props.content);
  }

  onCloseButtonClickHandler() {
    dispatch({ type: 'closeEditor' });
  }

  render() {
    return html`
      <div class="editor">
        <${CloseButton} onClickHandler=${this.onCloseButtonClickHandler} />
        <div class="editor__saved-indicator">✔️saved</div>
        <div ref=${editorEl => (this.editorEl = editorEl)} />
      </div>
    `;
  }
}

module.exports = Editor;
