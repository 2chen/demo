import * as React from "react";
import {
  AppState,
  BreadCrumb,
  Collection,
  EnrichedPost,
  LinkLike,
  Locator,
  Relationship,
  Tag,
  User,
} from "../reducers/redux";
import {Feed} from "./ErasmusApp";
import {Button, ButtonGroup, Switch} from "@blueprintjs/core";
import {UnfurlResult} from "../reducers/dispatcher";
import {dispatcher} from "../root";
import {Locatable, MiniBadge} from "./MiniBadge";
import {articles} from "../reducers/articles";
import {MediaParser} from "./MediaParser";
import {CollectionFeedControls, UserFeedControls} from "./FeedControls";
import {connect} from "react-redux";
import {getContributors} from "./reselect";

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
      return <CollectionInfo locator={this.props.locator} {...(this.props.object as Collection)} />;
    }
  };

  private renderControls = () => {
    switch(this.props.type) {
      case "p":
        return <ArticleControls />;
      case "c":
        return <CollectionFeedControls locator={this.props.locator}/>;
      case "u":
        return <UserFeedControls locator={this.props.locator} />;
      default:
        throw new Error("shouldn't happen");
    }
  }

  render() {
    return (
      <div className="omni-viewer">
        <div className="controls mini-feed">
          { this.renderControls() }
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

class ArticleControls extends React.PureComponent {
  render() {
    return (
      <div className="feed-controls">
        <div><Switch checked={true} label="Show tags" /></div>
        <div><Switch checked={true} label="Show comments" /></div>
        <div className="comments">
          <div className="subtitle">Comments</div>
          <div className="fake">Coming Soon™</div>
        </div>
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

  private renderRelationships = () => {
    const name = this.props.name === "Yichen Xing" ? "Your" : (this.props.name.split(" ")[0] + "'s");
    const res = [<div key="subtitle" className="subtitle">{name + " Interests"}</div>];
    [...this.props.publications, ...this.props.subscriptions].forEach(r => {
      res.push(<div key={r.of} className="relationship">
        <a className="noun">{r.noun}</a> of <MiniBadge locator={r.of} />
      </div>);
    });
    return res;
  }

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
        <div className="relationships">{this.renderRelationships()}</div>
        <div className="word-cloud"><div className="subtitle">Word Cloud</div><div className="fake">Coming Soon™</div></div>
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

  private renderSubsection = (name: string, links: LinkLike[]) => {
    return !links.length ? null : (
      <div className="subsection">
        <div className="subtitle">{name}</div>
        { links.map(c =>
          <div className="line" key={c.locator}>
            { (c as Tag).selector && this.renderSeeker(c as Tag) }
            <MiniBadge locator={c.locator}/>
          </div>) }
      </div>
    );
  }

  private renderSeeker = (tag: Tag) => {
    return <Seeker {...tag} />;
  }

  render() {
    const collections = this.props.instance.links.filter(link => link.locator.startsWith("c"));
    const users = this.props.instance.links.filter(link => link.locator.startsWith("u"));
    const media = this.props.instance.links.filter(link => link.locator.startsWith("m"));

    console.log(this.state.unfurl);
    return (
      <div className="media-info">
        <div className="picture">
          <img src={this.state.unfurl && (this.state.unfurl.other.maskIcon || this.state.unfurl.other.icon)} />
        </div>
        <div className="source"><span className="subtitle">From </span><div><MiniBadge locator={this.props.instance.source} /></div></div>
        <div className="creator"><span className="subtitle">By </span><div><MiniBadge locator={this.props.instance.creator} /></div></div>
        { this.renderSubsection("Linked Collections", collections) }
        { this.renderSubsection("Linked Users", users) }
        { this.renderSubsection("Linked Media", media) }
      </div>
    );
  }
}

interface CollectionInfoOwnProps extends Collection, Locatable {
}

interface CollectionInfoProps extends CollectionInfoOwnProps {
  contributors: Locator[];
}

class UnconnectedCollectionInfo extends React.PureComponent<CollectionInfoProps> {

  private renderContributors = () => {
    if (this.props.contributors.length === 0) {
      return null;
    }

    const res = [<div className="subtitle">Contributors</div>];
    this.props.contributors.forEach((c) => {
      res.push(<div className="contributor">{<MiniBadge locator={c}/>}</div>);
    });
    return res;
  }

  render() {
    const editable = this.props.name === "Yichen Xing"; //lol
    // const {reputation, hearts, heartsGiven, verified} = this.props.quirks;

    return (
      <div className="collection-info">
        <div className="picture">
          <img src={"collections.png"} />
        </div>
        <div className="name">{this.props.name}</div>
        <div className="description">{this.props.description}</div>
        <div className="contributors">
          {this.renderContributors()}
        </div>
      </div>
    );
  }
}

const CollectionInfo = connect((state: AppState, props: CollectionInfoOwnProps) => {
  return {
    contributors: getContributors(state, props)
  };
})(UnconnectedCollectionInfo);

class Seeker extends React.PureComponent<Tag> {
  private onClick = () => {
    const viewer = document.getElementsByClassName("content-scroller").item(0);
    const tag = document.getElementById("tag-" + this.props.locator);
    if (tag && viewer) {
      viewer.scrollTop = tag.offsetTop - 20;
    }
  }

  render() {
    return <Button className="seeker" minimal={true} icon="zoom-in" onClick={this.onClick}/>;
  }
}
