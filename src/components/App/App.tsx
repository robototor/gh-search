import React, { memo } from 'react';
import { Paper } from '@material-ui/core';
import { RepoList } from '../repos';
import { Header } from '..';

interface Props {
  className?: string;
}

const App: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Header />
      <Paper>
        <RepoList />
      </Paper>
    </div>
  );
};

export default memo(App);
