const { appRoot } = require('../appRoot');
const electonStore = require('../electronStore');
const reducers = require('./reducers');

// Initial state.
global.state = {
  slot: {
    component: 'Empty',
    props: {},
  },
  editor: {
    content: '',
    currentFile: '',
  },
  pathToPosts: electonStore.get('pathToPosts'),
  notifications: [],
};

// Dispatch function.
const dispatch = appRoot => action =>
  appRoot.dispatchEvent(new CustomEvent(action.type, { detail: action }));
const subscribe = appRoot => observer => {
  appRoot.on('stateUpdate', observer);
};
const dispatchWithAppRoot = dispatch(appRoot);
const subscribeWithAppRoot = subscribe(appRoot);

// Dispatch initial state.
dispatchWithAppRoot({ type: 'stateUpdate', payload: global.state });

// Subscribe the reducers;
Object.keys(reducers).forEach(actionType => {
  appRoot.on(actionType, ({ detail: action }) => {
    global.state = reducers[actionType](global.state, action);
    dispatchWithAppRoot({ type: 'stateUpdate', payload: global.state });
  });
});

module.exports = {
  dispatch: dispatchWithAppRoot,
  subscribe: subscribeWithAppRoot,
};
