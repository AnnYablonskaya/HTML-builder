const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'),
  { recursive: true }, (err) => {
    if (err) throw err;
  });

//style
const from = path.join(__dirname, 'styles');
const steam = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), 'utf-8' );

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

//assets
const fileIn = path.join(__dirname, 'assets');
const fileOut = path.join(__dirname, 'project-dist','assets');

const copyDir = async function(filesIn, filesOut) {
  try {
    await fsp.rm(filesOut, {recursive: true, force: true});
    await fsp.mkdir(filesOut, {recursive: true});
    const files = await fsp.readdir(filesIn, {withFileTypes: true});
    for (let file of files) {
      if (file.isFile()) {
        fsp.copyFile(`${filesIn}/${file.name}`, `${filesOut}/${file.name}`);
      } else {
        copyDir(`${filesIn}/${file.name}`, `${filesOut}/${file.name}`);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
copyDir(fileIn, fileOut);

//html
let data = '';

async function changeHTML(file) {
  try {
    await fsp.readFile(path.join(__dirname, 'components', file.name))
      .then(function(result) {
        return data = result.toString();
      });
  } catch (err) {
    console.error(err);
  }
}

async function newHTML() {
  const files = await fsp.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
  let templateFile = await fsp.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  for (const file of files) {
    await changeHTML(file);
    let nameHTML = `{${file.name.split('.').slice(0, 1).join('')}}`;
    let regexp  = new RegExp(nameHTML);
    templateFile = templateFile.replace(regexp, data);  
    const result = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));  
    result.write(templateFile);
  }
}
newHTML();