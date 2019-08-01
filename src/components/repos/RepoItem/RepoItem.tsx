import React, { memo } from 'react';
import { Repo } from 'types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { RepoSummary, RepoDetails } from '..';

interface Props {
  className?: string;
  repo: Repo;
}

const RepoItem: React.FC<Props> = ({ className, repo }) => (
  <ExpansionPanel className={className}>
    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
      <RepoSummary repo={repo} />
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <RepoDetails repo={repo} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default memo(RepoItem);
