const util = require('util');
const readFile = util.promisify(require('fs').readFile);

module.exports = async function(file) {
  try {
    return await readFile(file, 'utf-8');
  } catch (err) {
    console.error(err);
  }
};
