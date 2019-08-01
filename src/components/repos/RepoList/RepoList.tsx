import React, { memo } from 'react';
import { useStore } from 'effector-react';
import { List, createStyles } from '@material-ui/core';
import reposStore from 'stores/repos';
import searchStore from 'stores/search';
import cn from 'classnames';
import { RepoItem } from '..';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      opacity: 0.5
    }
  })
);

interface Props {
  className?: string;
}

const RepoList: React.FC<Props> = ({ className }) => {
  const { repos, loading } = useStore(reposStore);
  const search = useStore(searchStore);
  const classes = useStyles();

  if (!search) {
    return <div>Введите поисковый запрос</div>;
  }

  if (!repos.length) {
    if (loading) {
      return null;
    }

    return <div>Список пуст</div>;
  }

  return (
    <List
      className={cn(className, {
        [classes.loading]: loading
      })}
    >
      {repos.map(repo => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </List>
  );
};

export default memo(RepoList);
