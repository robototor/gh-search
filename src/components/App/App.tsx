import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import reposStore from 'stores/repos';
import { RepoList } from 'components/repos';
import { useStore } from 'effector-react';
import { Header } from '..';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(3, 2),
      width: 940,
      margin: 'auto'
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const { loading } = useStore(reposStore);

  return (
    <div>
      <Header />
      {loading && <LinearProgress />}
      <div className={classes.content}>
        <RepoList />
      </div>
    </div>
  );
};

export default App;
