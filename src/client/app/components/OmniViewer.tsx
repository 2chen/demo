import * as React from "react";
import {BreadCrumb, Collection, EnrichedPost, User, Tag, LinkLike} from "../reducers/redux";
import {Feed} from "./ErasmusApp";
import {Button, ButtonGroup, InputGroup} from "@blueprintjs/core";
import {UnfurlResult} from "../reducers/dispatcher";
import {dispatcher} from "../root";
import {MiniBadge} from "./MiniBadge";
import {articles} from "../reducers/articles";
import {MediaParser} from "./MediaParser";

interface OmniViewerProps extends BreadCrumb {
  type: string;
  object: User | Collection | EnrichedPost;
  feed: Feed;
}

export class OmniViewer extends React.PureComponent<OmniViewerProps> {
  private renderFeed = () => {
    return this.props.feed.posts.map(post => {
      return (
        <PostPreview
          key={post.locator}
          {...post}
        />
      );
    });
  };

  private renderInfo = () => {
    if (this.props.type === "u") {
      return <UserInfo {...(this.props.object as User)} />;
    } else if (this.props.type === "p") {
      return <MediaInfo {...(this.props.object) as EnrichedPost} />;
    } else if (this.props.type === "c") {
      return <div>collections info goes here</div>;
    }
  };

  render() {
    return (
      <div className="omni-viewer width-limited">
        <div className="controls mini-feed">
          { this.props.type === "p"
            ? <ArticleControls />
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
    );
  }
}

class ArticleControls extends React.PureComponent {
  render() {
    return (
      <div className="feed-controls">
        <div>toggle highlights</div>
        <div>toggle tags</div>
        <div>comments go here</div>
      </div>
    );
  }
}

interface Unfurlable {
  unfurl?: UnfurlResult;
}

interface MediaViewerState extends Unfurlable {
  selectionVisible: boolean;
  right: number;
  top: number;
  start: number;
  end: number;
  text?: string;
  anchorNode?: Node;
}

class MediaViewer extends React.PureComponent<EnrichedPost, MediaViewerState> {
  constructor(props: EnrichedPost) {
    super(props);
    this.state = {selectionVisible: false, start: 0, end: 0, top: 0, right: 0};
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
      const start = selection.anchorOffset, end = selection.focusOffset;
      range.setStart(selection.anchorNode, selection.anchorOffset);
      range.setEnd(selection.focusNode, selection.focusOffset);
      const {top, right} = range.getClientRects()[0];
      this.setState({selectionVisible: true, top, right, text, anchorNode: selection.anchorNode, start, end});
    } else if (!text) {
      this.setState({selectionVisible: false, top: 0, right: 0});
    }
  };

  private handleTag = () => {
    if (!this.state.anchorNode) {
      return;
    }

    const {start, end} = this.state;
    console.log(JSON.stringify(this.getSelector(this.state.anchorNode, {
      locator: "",
      selector: {id: "", path: [], position: [start, end]}
    })));
  };

  private getSelector(node: Node, tag: Tag): LinkLike {
    if ((node as HTMLElement).id) {
      (tag as Tag).selector.id = (node as HTMLElement).id;
      return tag;
    } else {
      const siblings = node.parentNode!.childNodes;
      for (let i = 0; i < siblings.length; i++) {
        if (siblings.item(i) === node) {
          tag.selector.path.unshift(i);
          return this.getSelector(node.parentNode!, tag);
        }
      }
    }
    return {locator: tag.locator};
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
          <ButtonGroup>
            <Button className="item" onClick={this.handleTag} icon="tag" />
            <Button className="item" icon="comment" />
            <Button className="item" icon="star" />
          </ButtonGroup>
        </div>
        <div className="title">{this.props.instance.name}</div>
        <div id="media-body" className="media-body" onClick={this.handleSelection}>
          <MediaParser post={this.props} html={articles[this.props.instance.url]} />
        </div>
      </div>
    );
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
        <div className="content">
          <div className="authorship">
            <MiniBadge locator={this.props.instance.creator} /> in <MiniBadge locator={this.props.instance.source} />
          </div>
          <div className="bottom">
            <div className="preview-sizer">
              <div className="preview">
                <img className="preview" src={this.state.unfurl
                && this.state.unfurl.ogp.ogImage[0] && this.state.unfurl.ogp.ogImage[0].url} />
              </div>
            </div>
            <div className="title-description">
              <div className="title">
                <a href={href}>{this.props.instance.name}</a>
              </div>
              <div className="description">
                <a href={href}>{this.props.instance.description}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="preview-controls">
          <div className="pin"><Button minimal={true} icon="pin" /></div>
          <div><span>23</span><Button minimal={true} icon={<img className="icon" src="reputation.png" />} /></div>
          <div><span>23</span><Button minimal={true} icon={<img className="icon" src="hearts.png" />} /></div>
          <div><span>23</span><Button minimal={true} icon="comment" /></div>
        </div>
      </div>
    );
  }
}

class UserInfo extends React.PureComponent<User> {
  //pic
  //name
  //description
  //contributor to Erasmus
  //latest starred post

  render() {
    const editable = this.props.name === "Yichen Xing"; //lol
    // const {reputation, hearts, heartsGiven, verified} = this.props.quirks;

    return (
      <div className="user-info">
        <div className="picture">
          <img src={this.props.icon || "anonymous.png"} />
        </div>
        <div className="name">{this.props.name}</div>
        <div className="description">{this.props.description}</div>
        <div className="quirks">
          <table className="quirks">
            <tbody>
              <tr>
                <th><img className="icon" src="reputation.png" /></th>
                <th><img className="icon" src="hearts.png" /></th>
                <th><img className="icon" src="hearts-given.png" /></th>
              </tr>
              <tr>
                <td>46 reps</td>
                <td>2 received</td>
                <td>0 given</td>
              </tr>
            </tbody>
          </table>
        </div>
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
        <div>From <MiniBadge locator={this.props.instance.source} /></div>
        <div>By <MiniBadge locator={this.props.instance.creator} /></div>
        <div>Linked collections go here</div>
        <div>linked people go here</div>
        <div>Linked media go here</div>
      </div>
    );
  }
}
