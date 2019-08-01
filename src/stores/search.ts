import { createStore, createEvent } from 'effector';

const store = createStore('');

export const setSearch = createEvent<string>();

store.on(setSearch, (state, payload) => payload);

export default store;
