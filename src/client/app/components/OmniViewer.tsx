import * as React from "react";
import {Collection, EnrichedPost, Post, User} from "../reducers/redux";

interface OmniViewerProps {
  type: string;
  id: string;
  object: User | Collection | Post;
  feed: EnrichedPost[];
}

export class OmniViewer extends React.PureComponent<OmniViewerProps> {
  render() {
    const userInfo = this.props.type === "u" && <UserInfo {...(this.props.object as User)} />;
    // const collectionInfo = this.props.type === "c" && <CollectionInfo {...(this.props.object as User)} />;

    return (
      <div className="omni-viewer">
        <div className="controls">
        </div>

        <div className="content">
          { this.props.feed.map(post => {
            return (
              <PostPreview
                key={post.locator}
                {...post}
               />
            )
          })}
        </div>

        <div className="info">
          { userInfo }
        </div>
      </div>
    );
  }
}

class PostPreview extends React.PureComponent<EnrichedPost> {
  render() {
    return (
      <div className="post-preview" key={this.props.locator}>
        <div>{this.props.instance.source}</div>
        <div>{this.props.instance.title}</div>
        <div>{this.props.instance.description}</div>
        <div>{this.props.instance.creator}</div>
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
      <div>
        {this.props.name}
      </div>
    );
  }
}
