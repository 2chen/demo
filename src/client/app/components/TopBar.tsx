import * as React from "react";
import {connect} from "react-redux";
import {AppState, BreadCrumb} from "../reducers/redux";
import {getRealBreadcrumbs} from "./reselect";

interface TopBarProps extends BreadCrumb {
  index: number;
  breadcrumbs: BreadCrumb[];
}

export class UnconnectedTopBar extends React.PureComponent<TopBarProps> {
  render() {
    return (
      <div className="top-bar">
        <div className="logo">
          <span className="front">erasm</span><span className="back">us</span>
        </div>
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
              <div><span>Views</span><span>1234</span></div>
              <div><span>Reps</span><span>12</span></div>
              <div><span>Hearts</span><span>2</span></div>
              <div><span>Comments</span><span>3</span></div>
              <div>tag icon</div>
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
