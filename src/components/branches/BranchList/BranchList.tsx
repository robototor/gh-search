import React, { memo } from 'react';
import { List, Typography } from '@material-ui/core';
import { useStore } from 'effector-react';
import branchesStore from 'stores/branches';
import { BranchItem } from '..';

interface Props {
  className?: string;
  id: number;
}

const BranchList: React.FC<Props> = ({ className, id }) => {
  const branches = useStore(branchesStore)[id];

  if (!branches || !branches.length) {
    return <div>Ветвей нет</div>;
  }

  return (
    <div className={className}>
      <Typography variant="h6">Ветви проекта</Typography>
      <List>
        {branches.map(branch => (
          <BranchItem key={branch.name} branch={branch} />
        ))}
      </List>
    </div>
  );
};

export default memo(BranchList);
