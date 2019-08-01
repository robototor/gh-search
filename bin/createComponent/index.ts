const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const colors = require('colors/safe');
const rimraf = require('rimraf');

const updateIndex = require('./updateIndex');
const componentTemplates = require('./componentTemplates');
const createFiles = require('./createFiles');

yargs
  .option('path', {
    alias: 'p',
    default: '',
    describe: 'Path to component root',
  })
  .option('base', {
    alias: 'b',
    default: 'src/components',
    describe: 'Base path for components',
  })
  .option('component', {
    alias: 'c',
    describe: 'Component name',
    required: true,
  })
  .option('force', {
    alias: 'f',
    describe: 'Force creation',
  })
  .option('remove', {
    alias: 'r',
    describe: 'Remove component',
  });

const { argv } = yargs;
const fullPath = path.resolve(__dirname, '../..', argv.base, argv.path);
const componentFullPath = path.resolve(fullPath, argv.component);
const componentData = componentTemplates(argv.component);

if (!fs.existsSync(componentFullPath) || argv.force) {
  createFiles(componentFullPath, componentData);
  updateIndex(fullPath);
} else {
  if (argv.remove) {
    rimraf.sync(componentFullPath);
    updateIndex(fullPath);
    console.log(colors.blue('info'), `Component ${argv.component} removed`);
  } else {
    console.error(
      colors.red('error'),
      `Component ${argv.component} is already exist`,
    );
  }
}
