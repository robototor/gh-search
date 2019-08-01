import React, { memo, useState, useEffect } from 'react';
import { Paper, TextField } from '@material-ui/core';
import reposStore, { setRepos } from 'stores/repos';
import { useStore } from 'effector-react';
import apiClient from 'apiClient';
import { Repo } from 'types';
import useDebounce from 'hooks/useDebounce';
import { RepoList } from '..';

interface Props {
  className?: string;
}

const App: React.FC<Props> = ({ className }) => {
  const repos = useStore(reposStore);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    setLoading(true);
  };

  useEffect(() => {
    if (debouncedSearch) {
      apiClient.get<{ items: Repo[] }>('/search/repositories', { params: { q: debouncedSearch } }).then(({ data }) => {
        setRepos(data.items);
        setLoading(false);
      });
    } else {
      setLoading(false);
      setRepos([]);
    }
  }, [debouncedSearch]);

  return (
    <div className={className}>
      <Paper>
        <TextField onChange={handleChange} label="Поиск репозитория" type="search" margin="normal" />
        {search && <RepoList repos={repos} loading={loading} />}
      </Paper>
    </div>
  );
};

export default memo(App);
