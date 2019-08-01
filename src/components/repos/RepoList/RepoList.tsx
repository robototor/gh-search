import React, { memo } from 'react';
import { useStore } from 'effector-react';
import { List, LinearProgress } from '@material-ui/core';
import reposStore from 'stores/repos';
import searchStore from 'stores/search';
import { RepoItem } from '..';

interface Props {
  className?: string;
}

const RepoList: React.FC<Props> = ({ className }) => {
  const repos = useStore(reposStore);
  const { loading, search } = useStore(searchStore);

  if (!search) {
    return <div>Введите поисковый запрос</div>;
  }

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
