import React, { memo, useState } from 'react';
import { Repo } from 'types';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { RepoSummary, RepoDetails } from '..';

interface Props {
  className?: string;
  repo: Repo;
}

const RepoItem: React.FC<Props> = ({ className, repo }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleChange = (event: object, expanded: boolean) => {
    setShowInfo(expanded);
  };

  return (
    <ExpansionPanel className={className} onChange={handleChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <RepoSummary repo={repo} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <RepoDetails repo={repo} showInfo={showInfo} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default memo(RepoItem);
