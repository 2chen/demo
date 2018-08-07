import * as React from "react";
import {connect} from "react-redux";
import {AppState, BreadCrumb, Locator} from "../reducers/redux";
import {getRealBreadcrumbs} from "./reselect";
import {Button} from "@blueprintjs/core";

interface TopBarProps extends BreadCrumb {
  type: string;
  id: string;
  index: number;
  breadcrumbs: BreadCrumb[];
}

export class UnconnectedTopBar extends React.PureComponent<TopBarProps> {
  private renderSubmit = () => {
    if (this.props.id === "yichenxing") {
      return <Button minimal icon="share">Post something</Button>;
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const TopBar = connect(
  (state: AppState, props: BreadCrumb) => {
    return getRealBreadcrumbs(state, props);
  }
)(UnconnectedTopBar);
