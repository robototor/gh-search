// Global
import React, { memo } from 'react';

interface Props {
  className?: string;
}

const App: React.FC<Props> = ({ className }) => <div className={className} />;

export default memo(App);
