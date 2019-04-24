const path = require('path');
const gitRootDir = require('git-root-dir');
const git = require('simple-git/promise');
const electronStore = require('../electron-store');
const readFile = require('../file-system/read-file');
const { dispatch } = require('./zero-fux');
const writeFile = require('../file-system/write-file');
const template = require('../template-new-post');
const date = require('../yyyy-mm-dd');

const run = appRoot => {
  appRoot.on('openFile', async ({ detail: action }) => {
    try {
      const directory = electronStore.get('pathToPosts');
      const content = await readFile(path.join(directory, action.payload));
      dispatch({ type: 'openEditor', payload: content });
    } catch (error) {
      console.log(error);
    }
  });

  appRoot.on('createFile', async ({ detail: action }) => {
    const fileName = `${date()}-${action.payload}.md`;
    try {
      const directory = electronStore.get('pathToPosts');
      await writeFile(path.join(directory, fileName), template());
      console.log('WROTE FILE', global.state);
      dispatch({ type: 'openFile', payload: fileName });
    } catch (error) {
      console.error(error);
    }
  });

  appRoot.on('saveDocument', async ({ detail: action }) => {
    try {
      const directory = electronStore.get('pathToPosts');
      await writeFile(
        path.join(directory, global.state.editor.currentFile),
        action.payload
      );
      console.log('WROTE FILE', global.state);
      dispatch({ type: 'documentSaved' });
    } catch (error) {
      console.error(error);
    }
  });

  appRoot.on('publishBlog', async () => {
    dispatch({
      type: 'showNotification',
      payload: {
        message: 'Publishing your changes',
        time: new Date().getTime(),
      },
    });
    try {
      const directory = electronStore.get('pathToPosts');
      const rootDir = await gitRootDir(directory);
      await git(rootDir).add(`./*`);
      await git(rootDir).commit('new post');
      await git(rootDir).push('origin', 'master');
      console.log('Blog published.');
      dispatch({ type: 'blogPublished' });
    } catch (err) {
      console.log('ERROR:', err);
    }
  });

  appRoot.on('savePathToPosts', ({ detail: action }) => {
    electronStore.set('pathToPosts', action.payload);
  });
};

module.exports = { run };
