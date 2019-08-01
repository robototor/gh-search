export type ID = number;

export interface User {
  name?: string;
  login: string;
  id: ID;
  avatar_url: string;
}

export interface Repo {
  id: ID;
  name: string;
  description: string;
  owner: User;
}
