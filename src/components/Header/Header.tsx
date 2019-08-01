import React, { memo, useEffect } from 'react';
import { useStore } from 'effector-react';
import { Repo } from 'types';
import useDebounce from 'hooks/useDebounce';
import makeApi from 'hooks/useApi';
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { setRepos } from 'stores/repos';
import searchStore, { setSearch, setLoading } from 'stores/search';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      width: 300,
      marginLeft: 'auto'
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
    }
  })
);

const useApi = makeApi<{ items: Repo[] }>(
  {
    url: '/search/repositories'
  },
  {
    items: []
  }
);

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  const { search } = useStore(searchStore);
  const debouncedSearch = useDebounce(search, 300);
  const { loading, data, request } = useApi();
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    setLoading(true);
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (data) {
      setRepos(data.items);
    }
  }, [data]);

  useEffect(() => {
    if (debouncedSearch) {
      request({
        params: { q: debouncedSearch }
      });
    }
  }, [debouncedSearch, request]);

  return (
    <AppBar position="static" className={className}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          GitHub
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            onChange={handleChange}
            placeholder="Поиск репозитория"
            type="search"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
