import * as React from "react";
import {connect} from "react-redux";
import {AppState, BreadCrumb, Locator} from "../reducers/redux";
import {getRealBreadcrumbs} from "./reselect";
import {Button, Dialog, InputGroup, Overlay, Popover, Spinner} from "@blueprintjs/core";
import {UnfurlResult} from "../reducers/dispatcher";
import {dispatcher} from "../root";

interface TopBarProps extends BreadCrumb {
  type: string;
  id: string;
  index: number;
  breadcrumbs: BreadCrumb[];
}

interface TopBarState {
  isOpen: boolean;
}

export class UnconnectedTopBar extends React.PureComponent<TopBarProps, TopBarState> {
  constructor(props: TopBarProps) {
    super(props);
    this.state = {isOpen: false};
  }

  private onPost = () => {
    this.setState({isOpen: true});
  }

  private onClose = () => {
    this.setState({isOpen: false});
  }

  private renderSubmit = () => {
    if (this.props.id === "yichenxing") {
      return <Button minimal icon="share" onClick={this.onPost}>Post something</Button>;
    } else if (this.props.type === "u") {
      return <Button minimal icon="share">Share with this user</Button>;
    } else if (this.props.type === "c") {
      return <Button minimal icon="share">Post here</Button>;
    } else if (this.props.type === "p" || this.props.type === "m") {
      return <Button minimal icon="share">Upvote controls go here</Button>;
    }
  }

  render() {
    console.log(this.props.breadcrumbs[0].locator);
    return (
      <div className="top-bar">
        <div className="breadcrumb-background">
          <div className="breadcrumbs">
            { this.props.breadcrumbs.map((breadcrumb, index) => {
              return (
                <div className={`breadcrumb ${index === this.props.index ? "active": ""}`} key={index}>
                  <a href={`#/demo?${breadcrumb.locator}`}>{breadcrumb.name}</a>
                </div>
              )
            }) }

            <div className="vote-controls">
              { this.renderSubmit() }
              { this.state.isOpen && <SubmissionPopover onClose={this.onClose} /> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface SubmissionPopoverProps {
  url?: string;
  onClose: () => void;
}

interface SubmissionPopoverState {
  url: string;
  unfurling: boolean;
  unfurl?: UnfurlResult;
}

export class SubmissionPopover extends React.PureComponent<SubmissionPopoverProps, SubmissionPopoverState> {
  constructor(props: SubmissionPopoverProps) {
    super(props);
    this.state = {url: this.props.url || "", unfurling: false};
    this.props.url && this.unfurl(this.props.url);
  }

  private onChange = (e: React.FormEvent) => {
    const url = this.props.url || (e.target as HTMLInputElement).value || "";
    this.setState({url, unfurling: true});
    if (!url) {
      return this.setState({unfurl: undefined, unfurling: false});
    }

    this.unfurl(url);
  }

  private unfurl = (url: string) => {
    dispatcher.unfurl(url).then(unfurl => {
      this.setState({unfurl, unfurling: false});
    }).catch(e => {
      this.setState({unfurl: undefined, unfurling: false});
    });
  }

  private renderUnfurl = () => {
    if (!this.state.unfurl!.ogp) {
      return null;
    }

    const {ogUrl, ogTitle, ogDescription, ogImage} = this.state.unfurl!.ogp;

    return (
      <div className="unfurl-result">
        <div className="preview-sizer">
          <div className="preview">
            <img className="preview" src={this.state.unfurl
            && ogImage[0] && ogImage[0].url} />
          </div>
        </div>
        <div className="title-description">
          <div className="title">
            <a href={ogUrl}>{ogTitle}</a>
          </div>
          <div className="description">
            <a href={ogUrl}>{ogDescription}</a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Dialog onClose={this.props.onClose}
              isOpen={true}
              title={"Submit media to Erasmus"}
              className="submit-popover">
        <div className="submit-popover">
          <div className="input">
            <input className="bp3-input" onChange={this.onChange} value={this.state.url} placeholder={"Enter URL of media"} />
          </div>
          {
            this.state.unfurling && <Spinner />
          }
          {
            this.state.unfurl && this.renderUnfurl()
          }
        </div>
        <div className="bp3-dialog-footer">
          <div className="bp3-dialog-footer-actions">
            <button onClick={this.props.onClose} type="button" className="bp3-button">Cancel</button>
            <button onClick={this.props.onClose} type="submit" className="bp3-button bp3-intent-primary">Submit</button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export const TopBar = connect(
  (state: AppState, props: BreadCrumb) => {
    return getRealBreadcrumbs(state, props);
  }
)(UnconnectedTopBar);
