const util = require('util');
const path = require('path');
const readDir = util.promisify(require('fs').readdir);
const fileCreated = require('./file-created');

module.exports = async function(directory) {
  try {
    const fileNames = await readDir(directory);
    const fileNamesWithTime = await Promise.all(
      fileNames.map(async fileName => ({
        name: fileName,
        time: await fileCreated(path.join(directory, fileName)),
      }))
    );
    return fileNamesWithTime
      .sort((a, b) => b.time - a.time)
      .map(file => file.name);
  } catch (err) {
    console.error(err);
  }
};
