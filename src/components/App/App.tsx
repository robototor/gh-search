import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RepoList } from '../repos';
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

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <RepoList />
      </div>
    </div>
  );
};

export default App;
