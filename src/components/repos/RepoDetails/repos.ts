import { createStore, createEvent } from 'effector';
import { Repo } from 'types';

const store = createStore<Repo[]>([]);

export const setRepos = createEvent<Repo[]>();

store.on(setRepos, (state, payload) => payload);

export default store;
