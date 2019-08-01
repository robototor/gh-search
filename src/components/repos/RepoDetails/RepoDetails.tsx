import React, { memo, useEffect } from 'react';
import { Branch, Repo } from 'types';
import makeApi from 'hooks/useApi';
import { CircularProgress, createStyles } from '@material-ui/core';
import { setBranches } from 'stores/branches';
import { BranchList } from 'components/branches';
import { makeStyles } from '@material-ui/core/styles';

const useApi = makeApi<Branch[]>({}, []);

const useStyles = makeStyles(() =>
  createStyles({
    spinner: {
      margin: 'auto'
    }
  })
);

interface Props {
  className?: string;
  repo: Repo;
  showInfo: boolean;
}

const RepoDetails: React.FC<Props> = ({ className, repo, showInfo }) => {
  const { loading, data, loaded, request } = useApi();
  const classes = useStyles();

  useEffect(() => {
    if (showInfo && !loaded) {
      request({
        url: `/repos/${repo.owner.login}/${repo.name}/branches`
      });
    }
  }, [loaded, repo.name, repo.owner.login, request, showInfo]);

  useEffect(() => {
    setBranches({ key: repo.id, branches: data });
  }, [data, repo.id]);

  if (loading) {
    return <CircularProgress className={classes.spinner} />;
  }

  return (
    <div className={className}>
      <BranchList id={repo.id} />
    </div>
  );
};

export default memo(RepoDetails);
