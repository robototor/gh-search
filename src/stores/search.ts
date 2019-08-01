import { createStore, createEvent } from 'effector';

const store = createStore({
  loading: false,
  search: ''
});

export const setLoading = createEvent<boolean>();
export const setSearch = createEvent<string>();

store
  .on(setLoading, (state, payload) => ({ ...state, loading: payload }))
  .on(setSearch, (state, payload) => ({ ...state, search: payload }));

export default store;
