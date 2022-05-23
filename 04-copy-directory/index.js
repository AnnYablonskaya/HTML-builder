const fsp = require('fs/promises');
const path = require('path');

const filesIn = path.join(__dirname, 'files');
const filesOut = path.join(__dirname, 'files-copy');
(async () => {
  await fsp.rm(filesOut, {force: true, recursive: true});
  await fsp.mkdir(filesOut, {recursive: true});
  const files = await fsp.readdir(filesIn, {withFileTypes: true});
  files.forEach (async (file) => {
    if (file.isFile()){
      let from = path.join(filesIn, file.name);
      let newFile = path.join(filesOut, file.name);
      await fsp.copyFile(from, newFile);
    }
  });
})();