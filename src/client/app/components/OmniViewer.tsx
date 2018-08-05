import * as React from "react";
import {BreadCrumb, Collection, EnrichedPost, User} from "../reducers/redux";
import {articles} from "../reducers/articles";
import {Feed} from "./ErasmusApp";
import {Button, ButtonGroup, Icon, InputGroup, Popover} from "@blueprintjs/core";
import {UnfurlResult} from "../reducers/dispatcher";
import {dispatcher} from "../root";

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
          { this.props.type === "p" && ("More from " + this.props.feed.name) }
          { this.props.type === "p"
            ? this.renderMiniFeed()
            : <FeedControls /> }
        </div>

        <div className="content">
          <div className="content-scroller">
          { this.props.type === "p"
            ? <MediaViewer {...(this.props.object as EnrichedPost)} />
            : this.renderFeed() }
          </div>
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
      <div className="feed-controls">
        <InputGroup
          disabled={false}
          large={false}
          leftIcon="search"
          onChange={undefined}
          placeholder="Search"
        />
        <div>media filter goes here</div>
        <div>nerd controls go here</div>
        <div>collections go here</div>
      </div>
    )
  }
}

interface Unfurlable {
  unfurl?: UnfurlResult;
}

interface MediaViewerState extends Unfurlable {
  selectionVisible: boolean;
  right: number;
  top: number;
  text?: string;
}

class MediaViewer extends React.PureComponent<EnrichedPost, MediaViewerState> {
  constructor(props: EnrichedPost) {
    super(props);
    this.state = {selectionVisible: false, top: 0, right: 0};
  }

  componentWillMount() {
    dispatcher.unfurl(this.props.instance.url).then(unfurl => this.setState({unfurl}));
  }

  private handleSelection = () => {
    const selection = document.getSelection();
    const mediaBody = document.getElementById("media-body");
    const text = selection.toString();
    if (mediaBody && mediaBody.contains(selection.baseNode) && text) {
      const range = document.createRange();
      range.setStart(selection.anchorNode, selection.anchorOffset);
      range.setEnd(selection.focusNode, selection.focusOffset);
      const {top, right} = range.getClientRects()[0];
      this.setState({selectionVisible: true, top, right, text})
    } else if (!text) {
      this.setState({selectionVisible: false, top: 0, right: 0});
    }
  }

  render() {
    return (
      <div className="media-viewer">
        <div
          className="tagger"
          style={{
            opacity: this.state.selectionVisible ? 1 : 0,
            top: this.state.top - 30,
            left: this.state.right
          }}
        >
          <Popover
            content={(<div>yichen was here</div>)}
          >
            <ButtonGroup>
              <Button className="item" icon="comment" />
              <Button className="item" icon="tag" />
              <Button className="item" icon="star" />
            </ButtonGroup>
          </Popover>
        </div>
        <div className="title">{this.props.instance.name}</div>
        <div id="media-body" className="media-body" onClick={this.handleSelection}
          dangerouslySetInnerHTML={{__html: articles[this.props.instance.url]}}>
        </div>
      </div>
    )
  }
}

interface MiniPreviewProps extends EnrichedPost {
  selected: boolean;
}

class MiniPreview extends React.PureComponent<MiniPreviewProps, Unfurlable> {
  constructor(props: MiniPreviewProps) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    dispatcher.unfurl(this.props.instance.url).then(unfurl => this.setState({unfurl}));
  }

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

class PostPreview extends React.PureComponent<EnrichedPost, Unfurlable> {
  constructor(props: EnrichedPost) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    dispatcher.unfurl(this.props.instance.url).then(unfurl => this.setState({unfurl}));
  }

  render() {
    const href = `#/demo?/${this.props.locator}`;
    return (
      <div className="post-preview" key={this.props.locator}>
        <div className="authorship">
          <span>{this.props.instance.creator}</span> posted to <span>{this.props.instance.source}</span>
        </div>
        <div className="bottom">
          <div className="preview-sizer">
            <div className="preview">
              <img className="preview" src={this.state.unfurl
              && this.state.unfurl.ogp.ogImage[0] && this.state.unfurl.ogp.ogImage[0].url} />
            </div>
          </div>
          <div className="right">
            <a href={href}>{this.props.instance.name}</a>
            <a href={href}>{this.props.instance.description}</a>
          </div>
        </div>
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
        <div className="picture">
          <img src={this.props.icon} />
        </div>
        <div>{this.props.name}</div>
        <div>{this.props.description}</div>
        <div>badges go here</div>
        <div>relationships go here</div>
        <div>word cloud go here</div>
      </div>
    );
  }
}

class MediaInfo extends React.PureComponent<EnrichedPost, Unfurlable> {
  constructor(props: EnrichedPost) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    dispatcher.unfurl(this.props.instance.url).then(unfurl => this.setState({unfurl}));
  }

  render() {
    return (
      <div className="media-info">
        <div className="picture">
          <img src={this.state.unfurl && this.state.unfurl.other.maskIcon} />
        </div>
        <div>From Medium</div>
        <div>author goes here</div>
        <div>linked people go here</div>
        <div>comments go here</div>
      </div>
    )
  }
}
