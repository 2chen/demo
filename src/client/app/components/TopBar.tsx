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
      <div className="top-bar breadcrumbs">
        <div className="logo">
          <span className="front">erasm</span><span className="back">us</span>
        </div>
        <div className="breadcrumbs">
          { this.props.breadcrumbs.map((breadcrumb, index) => {
            return (
              <div className="breadcrumb" key={index}>
                <a href={`#/demo?${breadcrumb.locator}`}>{breadcrumb.name}</a>
                { index === this.props.index && "*" }
              </div>
            )
          }) }
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
