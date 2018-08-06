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
    console.log(this.props.breadcrumbs[0].locator)
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
              <div><span>submit article</span></div>
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
