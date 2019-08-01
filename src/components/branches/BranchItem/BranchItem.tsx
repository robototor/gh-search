import React, { memo } from 'react';
import { Branch } from 'types';
import { ListItem, ListItemIcon, Tooltip } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { VerifiedUser } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginLeft: theme.spacing(1)
    }
  })
);

interface Props {
  className?: string;
  branch: Branch;
}

const BranchItem: React.FC<Props> = ({ className, branch }) => {
  const classes = useStyles();

  return (
    <ListItem className={className} key={branch.name}>
      {branch.name}
      {branch.protected && (
        <ListItemIcon className={classes.icon}>
          <Tooltip title="protected" placement="right-start">
            <VerifiedUser fontSize="small" color="primary" />
          </Tooltip>
        </ListItemIcon>
      )}
    </ListItem>
  );
};

export default memo(BranchItem);
