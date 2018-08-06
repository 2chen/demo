import {AppState, Artifact, Locator, TypedArtifact, User} from "../reducers/redux";
import * as React from "react";
import {connect} from "react-redux";
import {getArtifact} from "./reselect";

export interface Locatable {
  locator: Locator;
}

interface BadgeProps extends Locatable {
  artifact: TypedArtifact;
}

class UnconnectedMiniBadge extends React.PureComponent<BadgeProps> {
  private renderIcon = () => {
    switch(this.props.artifact.artifactType) {
      case "u":
        const icon = (this.props.artifact as any as User).icon;
        if (icon) {
          return <img src={icon}/>;
        } else {
          return <img src={"anonymous.png"}/>;
        }
    }
  }

  render() {
    return (
      <span className="mini-badge">
        <a href={`#/demo?${this.props.locator}`} className="name">{this.props.artifact.name}</a>
        <div className="icon-holder">{this.renderIcon()}</div>
      </span>
    )
  }
}

class UnconnectedBadge extends React.PureComponent<BadgeProps> {
  private renderIcon = () => {
    switch(this.props.artifact.artifactType) {
      case "u":
        const icon = (this.props.artifact as any as User).icon;
        if (icon) {
          return <img src={icon}/>;
        } else {
          return <img src={"anonymous.png"}/>;
        }
      case "c":
        return <img src="collections.png" />;
    }
  }

  private renderType = () => {
    switch(this.props.artifact.artifactType) {
      case "u":
        return "User";
      case "c":
        return "Collection";
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="badge">
        <div className="icon-holder">{this.renderIcon()}</div>
        <div className="name">{this.props.artifact.name || this.props.locator}</div>
        <div className="type">{this.renderType()}</div>
        <div className="description">{this.props.artifact.description}</div>
      </div>
    )
  }
}

export const MiniBadge = connect(
  (state: AppState, props: Locatable) => {
    const artifact = getArtifact(state, props);
    return {
      ...props,
      artifact
    };
  }
)(UnconnectedMiniBadge);

export const Badge = connect(
  (state: AppState, props: Locatable) => {
    const artifact = getArtifact(state, props);
    return {
      ...props,
      artifact
    };
  }
)(UnconnectedBadge);
