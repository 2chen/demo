import * as React from "react";
import {TopBar} from "./TopBar";
import {OmniViewer} from "./OmniViewer";
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {
  AppState,
  BackendState,
  Collection,
  CollectionLike,
  EnrichedPost,
  FrontendState,
  Locator, Medium,
  Post,
  User
} from "../reducers/redux";
import {flatten, memoize, uniq, uniqBy} from "lodash";

interface OwnProps {
  previewing: boolean;
  demoPath?: string;
}

interface Props extends OwnProps, AppState {
  type: string;
  id: string;
  feed: EnrichedPost[];
  object: User | Collection | Post;
}

class UnconnectedErasmusApp extends React.Component<Props> {
  render() {
    return (
      <div className={`preview-pane ${this.props.previewing ? "previewing" : ""}`}>
        <div className="app-container">
          <TopBar {...this.props} />
          <OmniViewer {...this.props} />
        </div>
      </div>
    );
  }
}

const getFrontendState = (state: AppState) => state.frontend;

const getBackendState = (state: AppState) => state.backend;

const getView = (state: AppState, props: OwnProps) => props.demoPath || "/u/yichenxing";

function _convertLocator(locator: Locator) {
  const components = locator.split("/");
  if (!components[0]) {
    components.shift();
  }
  return [components[0], components.slice(1).join("/")];
}
const convertLocator = memoize(_convertLocator);

const getTypeAndId = createSelector(
  [getView],
  (view: string) => {
    return (convertLocator(view));
  }
);

function getObject(backend: BackendState, typeAndId: string[]) {
  const [type, id] = typeAndId;
  switch (type) {
    case "u":
      return backend.users[id];
    case "c":
      return backend.collections[id];
    case "p":
      return backend.posts[id];
    case "m":
      return backend.media[id];
    default:
      throw new Error("wtf");
  }
}

function enrichPost(backend: BackendState, locator: Locator): EnrichedPost {
  const post = getObject(backend, convertLocator(locator)) as Post;
  const instance = getObject(backend, convertLocator(post.medium)) as Medium;
  return {
    locator,
    instance,
    ...post
  };
}

function getFeed(backend: BackendState, frontend: FrontendState, target: string | string[]): EnrichedPost[] {
  const object = target instanceof Array
    ? getObject(backend, target)
    : getObject(backend, convertLocator(target));
  let enrichedPosts: EnrichedPost[] = [];
  switch (target[0]) {
    case "u":
      const user = object as User;
      const postLocators = flatten([user.subscriptions, user.publications].map(
        sub => flatten(sub.map(r => r.of)
          .map(subId => getObject(backend, convertLocator(subId)))
          .map(thing => thing ? (thing as CollectionLike).posts : []))));
      postLocators.push(...user.posts);
      enrichedPosts = uniq(postLocators).map(locator => enrichPost(backend, locator));
      break;
    case "c":
      const collection = object as Collection;
      enrichedPosts = uniq(collection.posts).map(locator => enrichPost(backend, locator));
      break;
    case "p":
      throw new Error("shouldn't happen");
    case "m":
      const media = object as Medium;
      enrichedPosts = uniq(media.posts).map(locator => enrichPost(backend, locator));
  }
  return uniqBy(enrichedPosts, post => post.medium);
}

const getObjectAndFeed = createSelector(
  [getBackendState, getTypeAndId, getFrontendState],
  (backend: BackendState, typeAndId: string[], frontend: FrontendState) => {
    const [type, id] = typeAndId;
    const object = getObject(backend, typeAndId);
    const feed = getFeed(backend, frontend, frontend.searchControlState.target || typeAndId);
    return {object, feed, type, id};
  }
);

export const ErasmusApp = connect(
  (state: AppState, props: OwnProps) => {
    return {
      ...getObjectAndFeed(state, props),
      ...state,
    };
  },
)(UnconnectedErasmusApp);
