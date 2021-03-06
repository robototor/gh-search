import React, { memo } from 'react';
import { Repo } from 'types';
import { Avatar, ListItemText, Typography, Grid } from '@material-ui/core';

interface Props {
  repo: Repo;
}

const RepoSummary: React.FC<Props> = ({ repo }) => (
  <>
    <Grid container justify="space-between" alignItems="center" spacing={2} wrap="nowrap">
      <Grid item>
        <ListItemText
          primary={
            <Typography variant="h5" color="textPrimary">
              {repo.name}
            </Typography>
          }
          secondary={repo.description}
        />
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar src={repo.owner.avatar_url} />
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textPrimary">
              {repo.owner.name || repo.owner.login}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
);

export default memo(RepoSummary);
