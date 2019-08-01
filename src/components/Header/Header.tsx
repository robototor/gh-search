import React, { memo, useEffect } from 'react';
import { useStore } from 'effector-react';
import { Repo } from 'types';
import useDebounce from 'hooks/useDebounce';
import makeApi from 'hooks/useApi';
import { AppBar, Toolbar, Typography, TextField } from '@material-ui/core';
import { setRepos } from 'stores/repos';
import searchStore, { setSearch, setLoading } from 'stores/search';

interface Props {
  className?: string;
}

const useApi = makeApi<{ items: Repo[] }>({
  url: '/search/repositories'
},{
  items: []
})

const Header: React.FC<Props> = ({ className }) => {
  const { search } = useStore(searchStore);
  const debouncedSearch = useDebounce(search, 300);
  const { loading, data, request } = useApi();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  useEffect(() => {
    setLoading(loading);
  }, [loading, search]);

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
        <TextField onChange={handleChange} label="Поиск репозитория" type="search" margin="normal" />
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
