import * as React from "react";
import {AppState} from "../reducers";
import {connect} from "react-redux";
import {Dispatch} from "redoodle";
import {Button} from "@blueprintjs/core";

interface ErasmusAppProps extends AppState {
  demoPath?: string;
  dispatch: Dispatch;
}

interface ErasmusAppState {
  counter: number;
}

class UnconnectedErasmusApp extends React.Component<ErasmusAppProps, ErasmusAppState> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const path = this.props.demoPath || "u/yichenxing";

    return (
      <div className="app-container">
        { this.renderPath(path) }
      </div>
    );
  }

  public renderPath(path: string) {
    if (path.startsWith("u")) {
      console.log(this.props.backend);
      return (
        <div>
          <Button>yichen's page</Button>
        </div>
      );
    } else if (path.startsWith("p")) {
      return (
        <div>
          it's a post
        </div>
      );
    } else if (path.startsWith("c")) {
      return (
        <div>
          it's a collection
        </div>
      );
    }
  }
}

export const ErasmusApp = connect(
  (appState: AppState) => {
    return {...appState};
  },
  dispatch => {
    return {dispatch};
  }
)(UnconnectedErasmusApp);
