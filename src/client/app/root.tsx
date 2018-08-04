import * as React from "react";
import {Provider} from "react-redux";
import {createStore} from "redoodle";
import {reducers} from "./reducers";
import {INITIAL_STATE} from "./reducers/state";

const {Impress, Step} = require("react-impressjs");
import "./components/bundle.scss";
import {ErasmusApp} from "./components/ErasmusApp";

const DEFAULT_DURATION = 250;

const store = createStore(reducers, INITIAL_STATE);

interface RootProps {
  width?: number;
  height?: number;
  path?: string;
  demoPath?: string;
}

export class Root extends React.Component<any, RootProps> {
  private impress: any;
  private keybindingsDisabled = false;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.impress = undefined;
      this.setState({width: undefined, height: undefined});
    });

    window.addEventListener("hashchange", () => {
      const match = window.location.hash.match(/^#\/?([^?]*)\??(.*)/) || [];
      this.setState({path: match[1], demoPath: match[2]});
    });
  }

  impressDidMount = (impress: any) => {
    if (this.impress || !impress) {
      return;
    }

    console.log("wtf");
    this.impress = impress;
    const originalGoto = this.impress.goto;
    this.impress.goto = (...args: any[]) => {
      originalGoto.apply(this.impress, args);
      const id = window.location.hash.match(/^#\/?([^?]*)/)![1];
      this.keybindingsDisabled = id === "demo";
    };

    // //TODO:
    // setTimeout(() => {
    //   this.impress.next();
    // });

    document.addEventListener("keydown", (e) => {
      if (!this.keybindingsDisabled && e.keyCode >= 32 && e.keyCode <= 40) {
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
            id="introduction"
            duration={DEFAULT_DURATION}
            data={{width, height}}
          >
            Introduction
          </Step>
          <Step
            id="demo"
            duration={DEFAULT_DURATION}
            data={{y: height, width, height}}
          >
            <ErasmusApp
              {...this.state}
            />
          </Step>
          <Step
            id="post-demo"
            duration={DEFAULT_DURATION}
            data={{y: height! * 2, width, height}}
          >
            Conclusion
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
