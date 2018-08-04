import {combineReducers, TypedReducer} from "redoodle";

export type Locator = string;
export type Image = string;

export interface Relationship {
  noun: string;
  of: Locator;
}

export interface CollectionLike {
  posts: Locator[];
}

export interface User extends CollectionLike {
  name: string;
  description: string;
  icon?: Image;
  subscriptions: Relationship[];
  publications: Relationship[];
  quirks: {
    reputation: string;
    hearts: number;
    heartsGiven: number;
    verified: boolean;
  }
}

export interface Collection extends CollectionLike {
  name?: string;
  description?: string;
}

export interface Post {
  medium: Locator;
  type: "publish" | "rep" | "highlight" | "comment";
  metadata?: any;
}

export interface Medium extends CollectionLike {
  type: MediaType;
  source: Locator;
  title: string;
  description: string;
  url: string;
  creator: Locator;
  links: Locator[];
}

export interface EnrichedPost extends Post {
  locator: string;
  instance: Medium;
}

export interface BackendState {
  users: {[id: string]: User};
  collections: {[id: string]: Collection};
  posts: {[id: string]: Post};
  media: {[id: string]: Medium};
}

export interface BreadcrumbState {

}

export type MediaType = "comment" | "article" | "podcast";

export interface SearchControlState {
  target?: Locator;
  searchTerm?: string;
  type: "feed" | "stream" | "both";
  mediaFilters: MediaType[];
  goodnessSlider: number;
  newnessSlider: number;
  lengthSlider: number;
}

export interface FrontendState {
  user: Locator;
  searchControlState: SearchControlState;
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
