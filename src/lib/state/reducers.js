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

  openSettings(state) {
    return {
      ...state,
      slot: {
        component: 'Settings',
        props: { pathToPosts: state.pathToPosts },
      },
    };
  },

  receiveFileList(state, action) {
    return {
      ...state,
      fileList: action.payload,
      fileListFiltered: action.payload,
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

  deleteFile(state, action) {
    const slot =
      state.editor.currentFile === action.payload
        ? {
            component: 'Empty',
            props: {},
          }
        : state.slot;
    return {
      ...state,
      slot,
      fileList: state.fileList.filter(fileName => fileName !== action.payload),
      fileListFiltered: state.fileListFiltered.filter(
        fileName => fileName !== action.payload
      ),
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

  filterFiles(state, action) {
    return {
      ...state,
      filteredFiles: action.payload
        ? this.state.fileNames.filter(fileName =>
            fileName.includes(action.payload)
          )
        : this.state.fileNames,
    };
  },

  savePathToPosts(state, action) {
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

  filterFileList(state, action) {
    return {
      ...state,
      fileListFiltered: action.payload
        ? state.fileList.filter(fileName => fileName.includes(action.payload))
        : state.fileList,
    };
  },
};
