// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('codemirror/mode/yaml-frontmatter/yaml-frontmatter');
require('codemirror/mode/gfm/gfm');

const { ipcRenderer } = require('electron');
const { html, render } = require('htm/preact');
const mousetrap = require('mousetrap');

const App = require('./components/App');
const { appRoot } = require('./lib/appRoot');
const effects = require('./lib/state/effects');
const { dispatch } = require('./lib/state/zeroFux');

// Hotkeys.
mousetrap.bind('esc', () => dispatch({ type: 'openEmpty' }));
mousetrap.bind('cmd+w', () => dispatch({ type: 'openEmpty' }));
mousetrap.bind('cmd+o', () => dispatch({ type: 'openFileNavigator' }));
mousetrap.bind('cmd+u', () => dispatch({ type: 'publishBlog' }));
mousetrap.bind('cmd+,', () => dispatch({ type: 'openSettings' }));

// Fire actions from main process.
ipcRenderer.on('action', (_, action) => {
  dispatch(action);
});

// Run side effects.
effects.run(appRoot);

// Render the app.
render(
  html`
    <${App} />
  `,
  appRoot
);
