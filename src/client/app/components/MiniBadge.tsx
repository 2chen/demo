import {AppState, Artifact, Locator, Medium, TypedArtifact, User} from "../reducers/redux";
import * as React from "react";
import {connect} from "react-redux";
import {getArtifact} from "./reselect";

export interface Locatable {
  locator: Locator;
}

interface BadgeProps extends Locatable {
  artifact: TypedArtifact;
}

export const getIconForMedia = (type: string) => {

}

const renderIcon = (artifact: TypedArtifact) => {
  switch(artifact.artifactType) {
    case "u":
      const icon = (artifact as any as User).icon;
      if (icon) {
        return <div className="icon-holder round"><img src={icon}/></div>;
      } else {
        return <div className="icon-holder round"><img style={{opacity: 0.5}} src={"anonymous.png"}/></div>;
      }
    case "c":
      return <div className="icon-holder"><img style={{opacity: 0.5}} src="collections.png" /></div>;
    case "m":
      switch ((artifact as any as Medium).type) {
        case "comment":
          return <div className="icon-holder"><img style={{opacity: 0.5}} src="comment.png" /></div>;
        case "podcast":
          return <div className="icon-holder"><img style={{opacity: 0.5}} src="podcast.png" /></div>;
        case "article":
        default:
          return <div className="icon-holder"><img style={{opacity: 0.5}} src="article.png" /></div>;
      }
  }
}

class UnconnectedMiniBadge extends React.PureComponent<BadgeProps> {
  render() {
    return (
      <span className="mini-badge">
        <a href={`#/demo?${this.props.locator}`} className="name">
          <span className="name-holder">{this.props.artifact.name || this.props.locator}</span>
          {renderIcon(this.props.artifact)}
        </a>
      </span>
    )
  }
}

class UnconnectedBadge extends React.PureComponent<BadgeProps> {
  private renderType = () => {
    switch(this.props.artifact.artifactType) {
      case "u":
        return "User";
      case "c":
        return "Collection";
      case "m":
        const type = (this.props.artifact as any as Medium).type;
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  }

  private maybeRenderAttribution = () => {
    if (this.props.artifact.artifactType === "m") {
      const {creator, source} = (this.props.artifact as any as Medium);
      return <div><MiniBadge locator={creator} /> in <MiniBadge locator={source} /></div>;
    }
    return null;
  }

  render() {
    return (
      <div className="badge">
        {renderIcon(this.props.artifact)}
        <div className="name">{this.props.artifact.name || this.props.locator}</div>
        <div className="type">{this.renderType()}</div>
        { this.maybeRenderAttribution() }
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
