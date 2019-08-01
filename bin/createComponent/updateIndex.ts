const fs = require('fs');
const path = require('path');

const getComponents = (fullPath: string) => {
  const dirContent: string[] = fs.readdirSync(fullPath);

  return dirContent.filter(name => /^[A-Z]/.test(name));
};

const getExports = (names: string[]) => {
  return (
    names
      .map(name => `export { default as ${name} } from './${name}';`)
      .join('\n') + '\n'
  );
};

const updateIndex = (fullPath: string) => {
  const components = getComponents(fullPath);
  const allExports = getExports(components);

  fs.writeFileSync(path.resolve(fullPath, 'index.ts'), allExports);
};

module.exports = updateIndex;

export {};
