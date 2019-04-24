// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('codemirror/mode/yaml-frontmatter/yaml-frontmatter');
require('codemirror/mode/gfm/gfm');
const { ipcRenderer } = require('electron');
const { html, render } = require('htm/preact');
const hotkeys = require('hotkeys-js');
const App = require('./components/app');
const { appRoot } = require('./lib/app-root');
const effects = require('./lib/state/effects');
const { dispatch } = require('./lib/state/zero-fux');

// Hotkeys.
hotkeys('command+o', () => dispatch({ type: 'openFileNavigator' }));
hotkeys('command+u', () => dispatch({ type: 'publishBlog' }));
hotkeys('command+,', () => dispatch({ type: 'openSettings' }));

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
