import * as React from "react";
import {TopBar} from "./TopBar";
import {OmniViewer} from "./OmniViewer";
import {connect} from "react-redux";
import {AppState, Collection, EnrichedPost, User} from "../reducers/redux";
import {getObjectAndFeed, getView} from "./reselect";

export interface Feed {
  name: string;
  posts: EnrichedPost[];
}

export interface ErasmusAppOwnProps {
  previewing: boolean;
  demoPath?: string;
}

interface Props extends ErasmusAppOwnProps, AppState {
  type: string;
  id: string;
  locator: string;
  feed: Feed;
  object: User | Collection | EnrichedPost;
}

class UnconnectedErasmusApp extends React.Component<Props> {
  render() {
    const {name, description} = this.props.object;
    return (
      <div className={`preview-pane ${this.props.previewing ? "previewing" : ""}`}>
        <div className="app-container">
          <div className="logo">
            <div className="front">erasm</div>
            <div className="back">us</div>
          </div>
          <div className="width-limiter">
            <TopBar
              name={name}
              description={description}
              locator={this.props.locator}
            />
            <OmniViewer name={name} description={description} {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export const ErasmusApp = connect(
  (state: AppState, props: ErasmusAppOwnProps) => {
    const locator = getView(state, props);
    return {
      locator,
      ...getObjectAndFeed(state, props),
      ...state,
    };
  },
)(UnconnectedErasmusApp);
