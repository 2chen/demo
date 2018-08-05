import * as React from "react";
import {BreadCrumb, Collection, EnrichedPost, User} from "../reducers/redux";
import {articles} from "../reducers/articles";
import {Feed} from "./ErasmusApp";

interface OmniViewerProps extends BreadCrumb {
  type: string;
  object: User | Collection | EnrichedPost;
  feed: Feed;
}

export class OmniViewer extends React.PureComponent<OmniViewerProps> {
  private renderMiniFeed = () => {
    return this.props.feed.posts.map(post => {
      const selected = post.locator === this.props.locator;
      return (
        <MiniPreview
          key={post.locator}
          selected={selected}
          {...post}
        />
      )
    })
  }

  private renderFeed = () => {
    return this.props.feed.posts.map(post => {
      return (
        <PostPreview
          key={post.locator}
          {...post}
        />
      )
    });
  }

  private renderInfo = () => {
    if (this.props.type === "u") {
      return <UserInfo {...(this.props.object as User)} />;
    } else if (this.props.type === "p") {
      return <MediaInfo {...(this.props.object) as EnrichedPost} />;
    } else if (this.props.type === "c") {
      return <div>collections info goes here</div>
    }
  }

  render() {
    return (
      <div className="omni-viewer">
        <div className="controls">
          { this.props.type === "p"
            ? this.renderMiniFeed()
            : <FeedControls /> }
        </div>

        <div className="content">
          { this.props.type === "p"
            ? <MediaViewer {...(this.props.object as EnrichedPost)} />
            : this.renderFeed() }
        </div>

        <div className="info">
          { this.renderInfo() }
        </div>
      </div>
    );
  }
}

class FeedControls extends React.PureComponent {
  render() {
    return (
      <div>
        <div>search goes here</div>
        <div>media filter goes here</div>
        <div>nerd controls go here</div>
        <div>collections go here</div>
      </div>
    )
  }
}

class MediaViewer extends React.PureComponent<EnrichedPost> {
  render() {
    return (
      <div
        className="media-viewer"
        dangerouslySetInnerHTML={{__html: articles[this.props.instance.url]}}>
      </div>
    )
  }
}

interface MiniPreviewProps extends EnrichedPost {
  selected: boolean;
}

class MiniPreview extends React.PureComponent<MiniPreviewProps> {
  render() {
    const href = `#/demo?/${this.props.locator}`;
    return (
      <div className="post-preview" key={this.props.locator}>
        <div className="authorship">
          <span>{this.props.instance.creator}</span> in <div>{this.props.instance.source}</div>
        </div>
        <a href={href}>{this.props.instance.name}</a>
      </div>
    )
  }
}

class PostPreview extends React.PureComponent<EnrichedPost> {
  render() {
    const href = `#/demo?/${this.props.locator}`;
    return (
      <div className="post-preview" key={this.props.locator}>
        <div className="authorship">
          <span>{this.props.instance.creator}</span> posted to <div>{this.props.instance.source}</div>
        </div>
        <a href={href}>{this.props.instance.name}</a>
        <a href={href}>{this.props.instance.description}</a>
        <div>date goes here</div>
      </div>
    )
  }
}

class UserInfo extends React.PureComponent<User> {
  //pic
  //name
  //description
  //contributor to Erasmus
  //latest starred post

  render() {
    return (
      <div className="user-info">
        <div>picture goes here</div>
        <div>{this.props.name}</div>
        <div>{this.props.description}</div>
        <div>badges go here</div>
        <div>relationships go here</div>
        <div>word cloud go here</div>
      </div>
    );
  }
}

class MediaInfo extends React.PureComponent<EnrichedPost> {
  render() {
    return (
      <div className="media-info">
        <div>source goes here</div>
        <div>views goes here</div>
        <div>likes go here</div>
        <div>hearts go here</div>
        <div>author goes here</div>
        <div>linked people go here</div>
        <div>comments go here</div>
      </div>
    )
  }
}
