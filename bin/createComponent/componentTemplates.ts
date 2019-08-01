const getComponent = (name: string) => `// Global
import React, { memo } from 'react';

interface Props {
  className?: string;
}

const ${name}: React.FC<Props> = ({ className }) => <div className={className} />;

export default memo(${name});
`;

const getIndex = (name: string) => `export { default } from './${name}';
`;

const getFiles = (name: string) => ({
  [`${name}.tsx`]: getComponent(name),
  'index.ts': getIndex(name),
});

module.exports = getFiles;

export {};
