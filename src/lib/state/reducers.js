module.exports = {
  openEditor(state, action) {
    return {
      ...state,
      slot: {
        component: 'Editor',
        props: { content: action.payload },
      },
      showFileNavigator: false,
    };
  },

  closeEditor(state) {
    return {
      ...state,
      slot: {
        component: 'Empty',
        props: {},
      },
    };
  },

  openEmpty(state) {
    return {
      ...state,
      slot: {
        component: 'Empty',
        props: {},
      },
      showFileNavigator: false,
    };
  },

  openSettings(state, action) {
    return {
      ...state,
      slot: {
        component: 'Settings',
        props: { pathToPosts: state.pathToPosts },
      },
    };
  },

  openFile(state, action) {
    return {
      ...state,
      editor: {
        currentFile: action.payload,
      },
      showFileNavigator: false,
    };
  },

  openFileNavigator(state) {
    return {
      ...state,
      showFileNavigator: true,
    };
  },

  closeFileNavigator(state) {
    return {
      ...state,
      showFileNavigator: false,
    };
  },

  savePathToPosts(state, action) {
    console.log(action.payload);
    return {
      ...state,
      pathToPosts: action.payload,
      app: {
        slot: {
          component: 'Empty',
          props: {},
        },
      },
    };
  },

  showNotification(state, action) {
    return {
      ...state,
      notifications: [...state.notifications, action.payload],
    };
  },

  removeNotification(state, action) {
    console.log('REMOVE', { state });
    return {
      ...state,
      notifications: state.notifications.filter(
        notification => notification.time !== action.payload
      ),
    };
  },
};
