const util = require('util');
const writeFile = util.promisify(require('fs').writeFile);

module.exports = async function(file, data) {
  try {
    await writeFile(file, data);
    console.log('file has been written');
  } catch (err) {
    console.error(err);
  }
};
