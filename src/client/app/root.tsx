import * as React from "react";
import {Provider} from "react-redux";
import {createStore} from "redoodle";

const {Impress, Step} = require("react-impressjs");
import {reducers} from "./reducers/redux";
import {INITIAL_STATE} from "./reducers/state";
import {ErasmusApp} from "./components/ErasmusApp";

import "./components/bundle.scss";
import {ErasmusDispatcher} from "./reducers/dispatcher";

const DEFAULT_DURATION = 250;

const store = createStore(reducers, INITIAL_STATE);
export const dispatcher = new ErasmusDispatcher(store);

interface RootProps {
  width?: number;
  height?: number;
  path?: string;
  demoPath?: string;
}

export class Root extends React.Component<any, RootProps> {
  private impress: any;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      const match = window.location.hash.match(/^#\/?([^?]*)\??(.*)/) || [];
      this.setState({path: match[1], demoPath: match[2]});
    });
  }

  impressDidMount = (impress: any) => {
    if (this.impress || !impress) {
      return;
    }

    this.impress = impress;

    document.addEventListener("keydown", (e) => {
      if (true || this.state.path !== "demo" && e.keyCode >= 32 && e.keyCode <= 40) {
        switch (e.keyCode) {
          case 37: // Left
            this.impress.prev();
            break;
          case 32: // Space
          case 39: // Right
            this.impress.next();
            break;
          default:
            break;
        }
      }
    }, false);
  };

  private setDimensions = (div: HTMLDivElement) => {
    if (div) {
      this.setState({width: div.clientWidth, height: div.clientHeight});
    }
  };

  private renderDimensionFinderOrImpress = () => {
    if (!this.state.height) {
      return (
        <div
          ref={(div: HTMLDivElement) => this.setDimensions(div)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
        </div>
      );
    } else {
      const {width, height} = this.state;
      return (
        <Impress
          ref={(impress: any) => this.impressDidMount(impress)}
          rootData={{
            width,
            height,
          }}
        >
          <Step
            id="prologue"
            duration={DEFAULT_DURATION}
            data={{width, height}}
          >
            <div className="slide">
              introduction
            </div>
          </Step>
          <Step
            id="team"
            duration={DEFAULT_DURATION}
            data={{y: height, width, height}}
          >
            <div className="slide">
              team
            </div>
          </Step>
          <Step
            id="demo-preview"
            duration={DEFAULT_DURATION}
            data={{y: height*2, width, height}}
          >
            <div className="slide">
              demo
            </div>
          </Step>
          <Step
            id="demo"
            duration={DEFAULT_DURATION}
            data={{y: height*2, width, height}}
          >
            <ErasmusApp
              previewing={this.state.path !== "demo"}
              demoPath={this.state.demoPath}
            />
          </Step>
          <Step
            id="post-demo"
            duration={DEFAULT_DURATION}
            data={{y: height*3, width, height}}
          >
            <div className="slide">
              demo q&a
            </div>
          </Step>
          <Step
            id="epilogue"
            duration={DEFAULT_DURATION}
            data={{y: height*4, width, height}}
          >
            <div className="slide">
              epilogue
            </div>
          </Step>
        </Impress>
      );
    }
  };

  public render() {
    return (
      <Provider store={store}>
        {this.renderDimensionFinderOrImpress()}
      </Provider>
    );
  }
}
