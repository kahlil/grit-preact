const Store = require('electron-store');
const path = require('path');
const userHome = require('user-home');

const electronStore = new Store();

module.exports = electronStore;
