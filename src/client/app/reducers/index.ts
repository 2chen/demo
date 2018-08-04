import {combineReducers, TypedReducer} from "redoodle";
import {INITIAL_BACKEND_STATE} from "./state";

export type Locator = string;
export type Image = string;

export interface User {
  name: string;
  description: string;
  icon?: Image;
  subscriptions: Locator[];
  publications: Locator[];
  posts: Locator[];
}

export interface Collection {
  name?: string;
  description?: string;
  posts: Locator[];
}

export interface Post {
  medium: Locator;
  type: "publish" | "rep" | "highlight" | "comment";
  metadata?: any;
}

export interface Medium {
  source: Locator;
  title: string;
  description: string;
  url: string;
  creator: Locator;
  links: Locator[];
  posts: Locator[];
}

export interface BackendState {
  users: {[id: string]: User};
  collections: {[id: string]: Collection};
  posts: {[id: string]: Post};
  media: {[id: string]: Medium};
}

export interface FrontendState {
  user: Locator;
}

export interface AppState {
  backend: BackendState;
  frontend: FrontendState;
}

const backendReducer = TypedReducer.builder<BackendState>()
  .build();

const frontendReducer = TypedReducer.builder<FrontendState>()
  .build();

export const reducers = combineReducers({
  backend: backendReducer,
  frontend: frontendReducer
});
