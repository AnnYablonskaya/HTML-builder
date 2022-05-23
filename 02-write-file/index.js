const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;
const text = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hi! Enter your thoughts...\n');

stdin.on ('data', data => {
  if (data.toString().trim() === 'exit'){
    stdout.write('Hmm. Bye! Come back!\n');
    process.exit(); 
  }
  text.write(data);
  
});

process.on('SIGINT', () => {
  stdout.write('Hmm. Bye! Come back!\n');
  process.exit(0);
});