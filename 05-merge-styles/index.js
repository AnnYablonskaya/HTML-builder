const fs = require('fs');
const path = require('path');
const from = path.join(__dirname, 'styles');
const steam = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8' );

(async function (elem, data) {
  try {
    const elements = await fs.promises.readdir(elem, { withFileTypes: true });
    for (const el of elements) {
      if (el.isFile() && path.extname(el.name) === '.css') {
        const readSteam = fs.createReadStream(path.join(elem, el.name), 'utf-8');
        readSteam.pipe(data);
      }
    }
  } catch (err) {
    console.log('ERROR!!!');
  }
})(from, steam);