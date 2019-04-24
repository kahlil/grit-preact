module.exports = (milliseconds, fn) =>
  new Promise(resolve => setTimeout(resolve.bind(null, fn), milliseconds));
