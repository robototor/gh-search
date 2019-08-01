import { createStore, createEvent } from 'effector';
import { Repo } from 'types';

const store = createStore<{ loading: boolean; repos: Repo[] }>({
  loading: false,
  repos: []
});

export const setRepos = createEvent<Repo[]>();
export const setLoading = createEvent<boolean>();

store
  .on(setRepos, (state, payload) => ({ ...state, repos: payload }))
  .on(setLoading, (state, payload) => ({ ...state, loading: payload }));

export default store;
