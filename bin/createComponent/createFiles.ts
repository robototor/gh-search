const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');
const mkdirp = require('mkdirp');

const createFiles = (
  fullPath: string,
  filesData: { [key: string]: string },
) => {
  for (let key in filesData) {
    const fileData = filesData[key];
    const filePath = path.resolve(fullPath, key);

    const relativePath = path.relative(
      path.resolve(__dirname, '../..'),
      filePath,
    );

    if (!fs.existsSync(fullPath)) {
      try {
        mkdirp.sync(fullPath);
      } catch (error) {
        console.error(colors.red('error'), error);
      }
    }

    try {
      fs.writeFileSync(filePath, fileData);
      console.log(colors.blue('info'), `File ${relativePath} created`);
    } catch (error) {
      console.error(colors.red('error'), error);
    }
  }
};

module.exports = createFiles;

export {};
