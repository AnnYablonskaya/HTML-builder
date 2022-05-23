
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'secret-folder');

fs.readdir(filePath, {withFileTypes:true} ,
  (err, file) =>{
    if(err) throw err;
    file.forEach((e)=> {
      if(e.isFile()){
        let namePath = path.parse(e.name);
        let allPath = path.join(filePath, e.name);
        fs.stat(allPath, (err,stats)=>{
          if (err) throw err;
          console.log(`${namePath.name} - ${namePath.ext.slice(1)} - ${stats.size}b`);
        });
      }
    });
  });