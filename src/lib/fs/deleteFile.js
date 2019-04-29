const util = require('util');
const deleteFile = util.promisify(require('fs').unlink);

module.exports = async function(file, data) {
  try {
    await deleteFile(file);
    console.log('file has been deleted');
  } catch (err) {
    console.error(err);
  }
};
