const util = require('util');
const stat = util.promisify(require('fs').stat);

module.exports = async function(file) {
  try {
    const stats = await stat(file);
    const birthTime = stats.birthtime.getTime();
    return birthTime;
  } catch (err) {
    console.error(err);
  }
};
