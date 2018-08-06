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

export interface Artifact {
  name: string;
  description: string;
}

export interface TypedArtifact extends Artifact {
  artifactType: string;
}

export interface User extends Artifact, CollectionLike {
  icon?: Image;
  subscriptions: Relationship[];
  publications: Relationship[];
  quirks?: {
    reputation: string;
    hearts: number;
    heartsGiven: number;
    verified: boolean;
  }
}

export interface Collection extends Artifact, CollectionLike {
}

export interface Post {
  medium: Locator;
  type: "publish" | "rep" | "highlight" | "comment";
  metadata?: any;
}

export interface Link {
  locator: Locator;
}

export interface Tag extends Link {
  selector: {
    id: string;
    path: number[];
    position?: number[];
  }
}

export type LinkLike = Link | Tag;

export interface Medium extends Artifact, CollectionLike {
  type: MediaType;
  source: Locator;
  url: string;
  creator: Locator;
  links: LinkLike[];
}

export interface EnrichedPost extends Artifact, Post {
  name: string;
  locator: string;
  instance: Medium;
}

export interface BackendState {
  users: {[id: string]: User};
  collections: {[id: string]: Collection};
  posts: {[id: string]: Post};
  media: {[id: string]: Medium};
}

export interface BreadCrumb extends Artifact {
  locator: Locator;
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
  breadcrumbs: BreadCrumb[];
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
