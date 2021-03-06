import {
  AppState,
  BackendState,
  BreadCrumb,
  Collection,
  CollectionLike,
  EnrichedPost,
  FrontendState,
  Locator,
  Medium,
  Post,
  Tag,
  TypedArtifact,
  User
} from "../reducers/redux";
import {flatten, memoize, uniq, uniqBy} from "lodash";
import {createSelector} from "reselect";
import {ErasmusAppOwnProps, Feed} from "./ErasmusApp";
import {Locatable} from "./MiniBadge";
import {MediaParserOwnProps} from "./MediaParser";
import {forEach, keys} from "lodash";

export const getFrontendState = (state: AppState) => state.frontend;
export const getBackendState = (state: AppState) => state.backend;

export const getView = (state: AppState, props: ErasmusAppOwnProps) => props.demoPath || "/u/yichenxing";

function _convertLocator(locator: Locator) {
  const components = locator.split("/");
  if (!components[0]) {
    components.shift();
  }
  return [components[0], components.slice(1).join("/")];
}
const convertLocator = memoize(_convertLocator);

export const getTypeAndId = createSelector(
  [getView],
  (view: string) => {
    return (convertLocator(view));
  }
);

export function getObject(backend: BackendState, typeAndId: string[] | string) {
  const [type, id] = typeAndId instanceof Array ? typeAndId : convertLocator(typeAndId);
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
  const {name, description} = instance;
  return {
    locator,
    instance,
    name, description,
    ...post
  };
}

function getFeed(backend: BackendState, frontend: FrontendState, target: string | string[]): Feed {
  const object = target instanceof Array
    ? getObject(backend, target)
    : getObject(backend, convertLocator(target));
  let name = "";
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
      if (`${target[0]}/${target[1]}` === frontend.user) {
        name = "Your Stories";
      } else {
        name = `${user.name.split(" ")[0]}'s Stream`;
      }
      break;
    case "c":
      const collection = object as Collection;
      enrichedPosts = uniq(collection.posts).map(locator => enrichPost(backend, locator));
      name = collection.name;
      break;
    case "p":
      throw new Error("shouldn't happen");
    case "m":
      const media = object as Medium;
      enrichedPosts = uniq(media.posts).map(locator => enrichPost(backend, locator));
      name = media.name;
  }
  return {posts: uniqBy(enrichedPosts, post => post.medium), name};
}

let lastFeed: Feed;
export const getObjectAndFeed = createSelector(
  [getBackendState, getTypeAndId, getFrontendState],
  (backend: BackendState, typeAndId: string[], frontend: FrontendState) => {
    const [type, id] = typeAndId;
    let object = getObject(backend, typeAndId);
    let feed;
    if (type === "p") {
      object = enrichPost(backend, `/${type}/${id}`); //lmao
      feed = lastFeed;
    } else {
      lastFeed = feed = getFeed(backend, frontend, frontend.searchControlState.target || typeAndId);
    }
    return {object, feed, type, id};
  }
);

const getCurrent = (state: AppState, props: BreadCrumb) => {return props};
const getUser = createSelector([getFrontendState], frontend => frontend.user);
const getBreadcrumbs = createSelector([getFrontendState], frontend => frontend.breadcrumbs);
export const getRealBreadcrumbs = createSelector([getBackendState, getCurrent, getBreadcrumbs, getUser],
  (backend: BackendState, current: BreadCrumb, stack: BreadCrumb[], userLoc: Locator) => {
    const user = getObject(backend, userLoc) as User;
    const breadcrumbs: BreadCrumb[] = stack.slice(0);
    if (!breadcrumbs.length) {
      breadcrumbs.push(Object.assign({}, user, {name: "Your Stories", locator: `/${userLoc}`}));
    }

    let index = breadcrumbs.findIndex(bc => bc.locator === current.locator);
    if (index < 0) {
      index = breadcrumbs.length;
      breadcrumbs.push(current);
    }

    return {
      index,
      breadcrumbs
    };
  }
);

const getLocator = (state: AppState, props: Locatable) => props.locator;
export const getArtifact = createSelector([getBackendState, getLocator], (backend, locator) => {
  return Object.assign({artifactType: convertLocator(locator)[0]}, getObject(backend, locator)) as TypedArtifact;
});

const getLinks = (state: AppState, props: MediaParserOwnProps) => props.post.instance.links;
export const convertTags = createSelector([getLinks], (links) => {
  const res: {[key: string]: Tag} = {};
  links.forEach(link => {
    if ("selector" in link) {
      res[link.selector.id] = link;
    }
  });
  return res;
});

export const getSearchControlState = createSelector([getFrontendState], (frontend) => {
  return frontend.searchControlState;
});

export const getCollectionsForUser = createSelector([getBackendState, getArtifact], (backend, artifact) => {
  if (artifact.artifactType === "u") {
    const user = artifact as any as User;
    const {publications, subscriptions} = user;
    const collections = [...publications, ...subscriptions].map(r => r.of);
    const collectionSet = new Set(collections);
    const noncollections = keys(backend.collections).map(key => `c/${key}`)
      .filter(key => !collectionSet.has(key));
    return { collections, noncollections };
  }
  return { collections: [], noncollections: [] };
});

export const getCollectionsForCollection = createSelector([getBackendState, getLocator], (backend, locator) => {
  const collections = [locator];
  const collectionSet = new Set(collections);
  const noncollections = keys(backend.collections).map(key => `c/${key}`)
    .filter(key => !collectionSet.has(key));
  return { collections, noncollections };
});

export const getContributors = createSelector([getBackendState, getLocator], (backend, locator) => {
  const posts = new Set((getObject(backend, locator) as Collection).posts);
  const contributors = new Set();
  forEach(backend.users, (user, userLocator) => {
    for (let i = 0; i < user.posts.length; i++) {
      if (posts.has(user.posts[i])) {
        contributors.add("u/" + userLocator);
        break;
      }
    }
  });
  return Array.from(contributors);
});
