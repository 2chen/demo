import {AllMediaTypes, AppState, Locator, SearchControlState, TypedArtifact, User} from "../reducers/redux";
import * as React from "react";
import {Button, InputGroup} from "@blueprintjs/core";
import {connect} from "react-redux";
import {getArtifact, getCollectionsForCollection, getCollectionsForUser, getSearchControlState} from "./reselect";
import {Locatable, MiniBadge} from "./MiniBadge";
import {INITIAL_STATE} from "../reducers/state";

interface FeedControlProps extends Locatable {
  searchState: SearchControlState;
  artifact: TypedArtifact;
  collections: Locator[];
  noncollections: Locator[];
}

class UnconnectedFeedControls extends React.PureComponent<FeedControlProps> {
  private getCollectionName = () => {
    if (this.props.artifact.artifactType === "u") {
      return this.props.artifact.name === "Yichen Xing"
        ? "My Collections"
        : this.props.artifact.name.split(" ")[0] + "'s Collections";
    } else {
      return this.props.artifact.name;
    }
  }

  private renderMediaFilter = () => {
    return AllMediaTypes.map(type => {
      return <Button
        key={type}
        minimal={true}
        className={this.props.searchState.mediaFilters.indexOf(type) ? "active" : "inactive"}
        icon={<img src={`${type}.png`}/>}
      />;
    });
  };

  private renderCollections = () => {
    if (this.props.artifact.artifactType === "u") {
      const name = this.getCollectionName();
      const results = [<div key="subtitle" className="subtitle">{name}</div>];
      this.props.collections.forEach(locator => {
        results.push(<MiniBadge key={locator} locator={locator}/>);
      });

      results.push(<div key="subtitle-2" className="subtitle">Suggested Collections</div>);
      this.props.noncollections.forEach(locator => {
        results.push(<MiniBadge key={locator} locator={locator}/>);
      });

      return results;
    }
    return null;
  };

  render() {
    return (
      <div className="feed-controls">
        <InputGroup
          disabled={false}
          large={false}
          leftIcon="search"
          onChange={undefined}
          placeholder={`Search ${this.getCollectionName()}`}
        />
        <div className="media-controls">{this.renderMediaFilter()}</div>
        <div className="fine-tune"><div className="subtitle">Fine Tune Controls</div><div className="fake">Coming Soon™</div></div>
        <div className="collections">
          {this.renderCollections()}
        </div>
      </div>
    );
  }
}

export const UserFeedControls = connect((state: AppState, props: Locatable) => {
  return {
    searchState: getSearchControlState(state),
    artifact: getArtifact(state, props),
    ...getCollectionsForUser(state, props),
  };
})(UnconnectedFeedControls);

export const CollectionFeedControls = connect((state: AppState, props: Locatable) => {
  return {
    searchState: getSearchControlState(state),
    artifact: getArtifact(state, props),
    ...getCollectionsForCollection(state, props),
  };
})(UnconnectedFeedControls);
