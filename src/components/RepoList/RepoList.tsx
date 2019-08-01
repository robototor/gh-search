import React, { memo } from 'react';
import { Repo } from 'types';
import { List, LinearProgress } from '@material-ui/core';
import { RepoItem } from '..';

interface Props {
  className?: string;
  repos: Array<Repo>;
  loading: boolean;
}

const RepoList: React.FC<Props> = ({ className, repos, loading }) => {
  if (loading) {
    return <LinearProgress />;
  }

  if (!repos.length) {
    return <div>Список пуст</div>;
  }

  return (
    <List className={className}>
      {repos.map(repo => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </List>
  );
};

export default memo(RepoList);
