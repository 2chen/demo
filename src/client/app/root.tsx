import * as React from "react";
import {Provider} from "react-redux";
import {createStore} from "redoodle";
import {reducers} from "./reducers/redux";
import {INITIAL_STATE} from "./reducers/state";
import {values} from "lodash";

import "./components/bundle.scss";
import {ErasmusDispatcher} from "./reducers/dispatcher";
import {NavState, transformSlidesForImpress, WindowSizeState, NavContext, defaultNavState} from "./slides";

const {Impress, Step} = require("react-impressjs");

const DEFAULT_DURATION = 250;

const store = createStore(reducers, INITIAL_STATE);
export const dispatcher = new ErasmusDispatcher(store);


interface RootState extends Partial<NavState>, Partial<WindowSizeState> {
}

interface StepContext extends RootState {
  x: number;
  y: number;
}

const tocData = {
  stateOfInternet: {
    id: "stateOfInternet",
    title: "State of the Internet",
  },
  productIntro: {
    id: "productIntro",
    title: "Product Introduction",
  },
  keyDifferentiators: {
    id: "keyDifferentiators",
    title: "Key Differentiators",
  },
}

export class Root extends React.Component<any, RootState> {
  private impress: any;
  private lastId: string = "";
  private stepContext: StepContext = undefined as any;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      const match = window.location.hash.match(/^#\/?([^-]*)-?(.*)/) || [];
      this.setState({slideId: match[1], transitionId: match[2]});
    });
  }

  impressDidMount = (impress: any) => {
    if (this.impress || !impress) {
      return;
    }

    this.impress = impress;

    document.addEventListener("keydown", (e) => {
      if (e.keyCode >= 32 && e.keyCode <= 40) {
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
      const size = {width: div.clientWidth, height: div.clientHeight};
      this.setState(size);
    }
  };

  private renderDimensionFinderOrImpress = () => {
    if (!this.state.width || !this.state.height) {
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
      return this.renderSlides();
    }
  };

  private renderSlides = () => {
    const {width, height} = this.state;
    this.stepContext = Object.assign({x: 0, y: 0}, this.state);
    console.log(this.state.slideId, this.state.transitionId);
    return (
      <div className="root">
        <div className="toc-container slide-aspect-ratio">
          { this.renderToc() }
        </div>
        <Impress
          ref={(impress: any) => this.impressDidMount(impress)}
          rootData={{
            width,
            height,
          }}
        >
        {[
          this.createSplashSlide(<div>
            <img className="background" src="./erasmusCollage.jpg" />
          </div>),
          this.createNextSlide(tocData.stateOfInternet.id,
            <div>
              {this.h("state of the internet goes here")}
            </div>
          ),
          this.createNextSlide(tocData.productIntro.id,
            <div className="slide-content">
              <div className="title">{this.h("Product Introduction")}</div>
              <div className="subsection">
                <div className="title">{this.h("Erasmus is a")}&nbsp;
                  {this.h("curator-centric", "curatorCentric")}&nbsp;
                  {this.h("cross-medium", "crossMedium")}&nbsp;
                  {this.h("recommendation platform", "recommendationPlatform", <div className="recommendationPlatform-popover" />)}
                </div>
              </div>
              <div className="subsection">
                <div className="title">{this.h("Key Features")}</div>
                <div className="bullet">{this.h("Track and rate media consumption")}</div>
                <div className="bullet">{this.h("Make and get recommendations across mediums and platforms")}</div>
                <div className="bullet">{this.h("Discover new topics and curators to follow")}</div>
              </div>
            </div>
          ),
          this.createTransition("recommendationPlatform"),
          this.createTransition("crossMedium"),
          this.createTransition("curatorCentric"),
          this.createNextSlide(tocData.keyDifferentiators.id,
            <div>
              slide into my dms
            </div>
          ),
        ]}
       </Impress>
      </div>
    );
  }

  // wrap text in a highlighted span
  private h = (text: string, transitionId?: string, popover?: JSX.Element) => {
    const highlighted = this.state.transitionId === transitionId ? "highlighted" : "";
    return <React.Fragment>
      {highlighted && popover}
      <span className={`text ${highlighted}`}>{text}</span>
    </React.Fragment>;
  }

  private renderToc = () => {
    return <div className="toc">
      {
        values(tocData).map(c => {
          return <div><a key={c.id} href={`#/${c.id}`}>{c.title}</a></div>;
        })
      }
    </div>;
  }

  render() {
    return (
      <Provider store={store}>
        {this.renderDimensionFinderOrImpress()}
      </Provider>
    );
  }

  private createSplashSlide = (content: JSX.Element) => {
    const id = "splash";
    return (
      <Step
        id={id}
        key={id}
        duration={DEFAULT_DURATION}
        data={Object.assign({}, this.stepContext)}
      >
        <div className="slide slide-aspect-ratio">
          <div className="logo">
            <div className="front">erasm</div>
            <div className="back">us</div>
          </div>
          <div className="footer">
            <div className="footer-left">Erasmus Technologies, Inc.</div>
            <div className="footer-right">Proprietary and Confidential</div>
          </div>
          { content }
        </div>
      </Step>
    );
  }

  private createNextSlide = (id: string, content: JSX.Element): JSX.Element => {
    this.stepContext.y += this.stepContext.height!;
    const res = (
      <Step
        id={id}
        key={id}
        duration={DEFAULT_DURATION}
        data={Object.assign({}, this.stepContext)}
      >
        <div className="slide background slide-aspect-ratio">
          <div className="logo">
            <div className="front">erasm</div>
            <div className="back">us</div>
          </div>
          <div className="footer">
            <div className="footer-left">Erasmus Technologies, Inc.</div>
            <div className="footer-right">Proprietary and Confidential</div>
          </div>
        </div>
        <div className="slide foreground slide-aspect-ratio">
          { content }
        </div>
      </Step>
    );
    this.lastId = id;
    return res;
  }

  private createTransition = (transitionId: string) => {
    const id = this.lastId + "-" + transitionId;
    return (
      <Step
        id={id}
        key={id}
        duration={DEFAULT_DURATION}
        data={Object.assign({}, this.stepContext)}
      />
    );
  }
}
