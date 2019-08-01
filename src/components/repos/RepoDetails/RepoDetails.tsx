import React, { memo } from 'react';
import { Repo } from 'types';

interface Props {
  className?: string;
  repo: Repo;
}

const RepoDetails: React.FC<Props> = ({ className, repo }) => (
  <div className={className}>
    {repo.name}
  </div>
);

export default memo(RepoDetails);
