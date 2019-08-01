import { createStore, createEvent } from 'effector';
import { Branch } from 'types';

const store = createStore<{ [key: number]: Branch[] }>([]);

export const setBranches = createEvent<{ key: number; branches: Branch[] }>();

store.on(setBranches, (state, payload) => ({ ...state, [payload.key]: payload.branches }));

export default store;
