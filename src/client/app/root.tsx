import * as React from "react";
import {Provider} from "react-redux";
import {createStore} from "redoodle";
import {reducers} from "./reducers/redux";
import {INITIAL_STATE} from "./reducers/state";
import {values} from "lodash";

import "./components/bundle.scss";
import {ErasmusDispatcher} from "./reducers/dispatcher";

const {Impress, Step} = require("react-impressjs");

const DEFAULT_DURATION = 250;

const store = createStore(reducers, INITIAL_STATE);
export const dispatcher = new ErasmusDispatcher(store);

interface NavState {
  slideId: string;
  transitionId: number;
}

interface WindowSizeState {
  width: number;
  height: number;
}

interface RootState extends Partial<NavState>, Partial<WindowSizeState> {
}

interface StepContext extends RootState {
  x: number;
  y: number;
}

const tocData = {
  stateOfContentDiscovery: {
    id: "stateOfContentDiscovery",
    title: "Problem Statement",
  },
  productIntro: {
    id: "productIntro",
    title: "Product Introduction",
  },
  keyDifferentiators: {
    id: "keyDifferentiators",
    title: "Key Differentiators",
  },
  pathToRevenue: {
    id: "pathToRevenue",
    title: "Path to Revenue",
  },
  failureModes: {
    id: "failureModes",
    title: "Failure Modes",
  },
  deepDive: {
    id: "deepDive",
    title: "Product Deep Dive",
  },
  progress: {
    id: "progress",
    title: "Looking Ahead",
  },
}

export class Root extends React.Component<any, RootState> {
  private impress: any;
  private lastId: string = "";
  private lastTransition: number = 0;
  private stepContext: StepContext = undefined as any;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      const match = window.location.hash.match(/^#\/?([^-]*)-?(.*)/) || [];
      this.setState({slideId: match[1], transitionId: match[2] ? Number(match[2]) : 0});
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
          this.createNextSlide(tocData.stateOfContentDiscovery.id,
            <div className="slide-content">
              <div className="title">Problem Statement</div>
              <div className="section">
                <div className={this.t("subsection truisms", 1, 3)}>
                  <div className="title">Truisms</div>
                  <div className="bullet">Discovery and recommendation are two sides of the same coin</div>
                  <div className="bullet">Advertisements are a type of recommendation</div>
                  <div className="bullet"><strong>Better content discovery leads to better advertisements</strong></div>
                </div>
                <div className={this.t("subsection discovery", 1, 3)}>
                  <div className="title">
                    <div className="label">How do we discover <strong>meaningful <span className={this.t("content", 3)}>{this.state.transitionId! >= 3 ? "books" : "content"}?</span></strong></div>
                  </div>
                  <div className={this.t("bullets", 2)}>
                    <div className="bullet">
                      <div className="label">Democratized rankings</div>
                      <div className={this.t("example", 3)}>
                        <img src="https://juliaquinn.com/WP/wp-content/uploads/2016/07/NYT-Bestseller-logo-818x200.png" />
                      </div>
                    </div>
                    <div className="bullet">
                      <div className="label">Machine learning algorithms</div>
                      <div className={this.t("example", 3)}>
                        <img src="http://d.gr-assets.com/misc/1454549184-1454549184_goodreads_misc.jpg" />
                      </div>
                    </div>
                    <div className="bullet">
                      <div className="label">Eminence-based recommendation</div>
                      <div className={this.t("eminence example", 3)}>
                        <img src="http://static.oprah.com/2016/01/201602-omag-wikfs-949x534.jpg" />
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1e154b10868229.5631a16e7ce8f.jpg" />
                      </div>
                    </div>
                    <div className="bullet">
                      <div className="label">Word-of-mouth</div>
                      <div className={this.t("example", 3)}>Book clubs, recommendation from a friend</div>
                    </div>
                  </div>
                </div>
                <div className={this.t("subsection quality", 4)}>
                  <div className="title">How good are these recommendations?</div>
                  <div className="bad">
                    <div className="bullet">Democratized rankings work well for mainstream content</div>
                    <div className="bullet">Machine learning recommenders:</div>
                      <div className="sub-bullet">Work very well in certain cases (e.g. Amazon: "Users also bought")</div>
                      <div className="sub-bullet">Personalized but not personal</div>
                  </div>
                  <div className={this.t("good", 5)}>
                    <div className="bullet">Eminence, word-of-mouth offer far better personalized recommendations</div>
                    <div className="bullet">Word-of-mouth creates a shared cultural experience</div>
                    <div className="bullet"><strong>Eminence and word-of-mouth are done ad hoc</strong></div>
                  </div>
                </div>
                <div className={this.t("subsection gaps", 4, 5)}>
                  <div className="title">Two Gaps</div>
                  <div className="bullet">No way to easily save recommendations</div>
                  <div className="bullet">No place to share recommendations with friends/followers</div>
                </div>
              </div>
            </div>
          ),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createNextSlide(tocData.productIntro.id,
            <div className="slide-content">
              <div className="title">{this.r("Product Introduction")}</div>
              <div className="section">
                <div className="subsection one-liner">
                  <div className="title">{this.r("Erasmus is a")}&nbsp;
                    <span className={this.t("text underline", 1)}>curator-centric</span>,<br/>
                    <span className={this.t("text underline", 2)}>cross-medium</span>&nbsp;
                    {this.r("recommendation platform")}
                  </div>
                </div>
                <div className="subsection core-features">
                  <div className="title">{this.r("Core Functionality")}</div>
                  <div className="bullet">{this.r("Recommend content to friends and followers")}</div>
                  <div className="bullet">{this.r("Discover new content, topics and curators to follow")}</div>
                  <div className="bullet">{this.r("Digest: read, listen, and watch in app or browser")}</div>
                  <div className="bullet">{this.r("Discuss and review content, track recommendations")}</div>
                </div>
                <div className="demo">
                  <img src="iphone.png" />
                </div>
              </div>
            </div>
          , (this.state.transitionId === 1 || this.state.transitionId === 2) ? "highlight" : ""),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createNextSlide(tocData.keyDifferentiators.id,
            <div className="slide-content">
              <div className="title">Key Differentiators</div>
              <div className="section">
                <div className="subsection landscape">

                </div>
              </div>
            </div>
          ),
          this.createNextSlide(tocData.pathToRevenue.id,
            <div className="slide-content">
              <div className="title">Path to Revenue</div>
              <div className="section">
                <div className={this.t("subsection before-zero", 0, 2)}>
                  <div className="title">Sanity Check</div>
                  <div className="bullet">
                      <span className="question">Is it useful?</span>
                      <span className={this.t("answer", 1)}><strong>Yes!</strong></span>
                  </div>
                  <div className="bullet">
                    <span className="question">Is it monetizable?</span>
                  </div>
                  <div className={this.t("answer", 2)}>
                    <div className="sub-bullet">Great data for targeting like Goodreads</div>
                    <div className="sub-bullet">Influencer-centric like Instagram</div>
                    <div className="sub-bullet">Seamless ads like Pinterest</div>
                  </div>
                </div>
                <div className={this.t("subsection zero-to-one", 3, 4)}>
                  <div className="title">Zero-to-One</div>
                  <div className="bullet">Start small with:</div>
                  <div className="sub-bullet">Broad topics within narrow set of media: podcasts, articles, longform</div>
                  <div className="sub-bullet">Broad media within narrow set of topics: tech, entrepreneurship, self-improvement</div>
                  <div className="bullet">build ontological model of this universe internally</div>
                  <div className="bullet">Work closely with influencers within these verticals</div>
                  <div className={this.t("bullet", 4)}><strong>We believe this is monetizable at a relatively small scale</strong></div>
                </div>
                <div className={this.t("subsection one-to-many", 5)}>
                  <div className="title">One to "Many Revenue"</div>
                  <div className="bullet">Open source ontological framework (like TMDB)</div>
                  <div className="bullet">Expand media, topics, and influencer engagement</div>
                </div>
              </div>
            </div>
          ),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createNextSlide(tocData.failureModes.id,
            <div className="slide-content">
              <div className="title">Failure Modes</div>
              <div className="section">
                <div className={this.t("subsection", 0)}>
                  <div className="title">Early Game Problems</div>
                  <div className="bullet">Lack of user or influencer buy-in</div>
                  <div className="sub-bullet">Well-connected in user/influencer space</div>
                  <div className="sub-bullet">To influencers: pitch as "intellectual identity" platform</div>
                  <div className="sub-bullet">Users and influencers will overlap significantly</div>
                  <div className="sub-bullet">Iterate closely with both groups</div>

                  <div className="bullet">Bad mobile UX</div>
                  <div className="sub-bullet">One of StumbleUpon's failure modes was failing to adapt to the emerging mobile world</div>
                  <div className="sub-bullet">The development landscape for mobile has fundamentally changed since 2009</div>
                  <div className="sub-bullet">Leverage ReactNative to share code with web</div>
                  <div className="sub-bullet">Iterate closely with mobile users</div>
                </div>
                <div className={this.t("subsection", 1)}>
                  <div className="title">Late Game Problems</div>

                  <div className="bullet">Data scale too big</div>
                  <div className="sub-bullet">Optimize for simple data model and fast user load times</div>
                  <div className="sub-bullet">Recommendation view will be calculated asynchronously</div>
                  <div className="sub-bullet">Flexible framework for future migration</div>

                  <div className="bullet">Gettin' gamed</div>
                  <div className="sub-bullet">Data model designed to be able to retroactively deal with this kind of gaming</div>
                  <div className="sub-bullet">Shadow banning</div>
                </div>
              </div>
            </div>
          ),
          this.createTransition(),
          this.createNextSlide(tocData.deepDive.id,
            <div className="slide-content">
              <div className="title">Product Deep Dive</div>
              <div className="section">
                <div className={this.t("subsection", 0)}>
                  <div className="title">Monetization</div>
                  <div className="bullet">Direct ads for content</div>
                  <div className="bullet">Content-aware ads (e.g. link to a brand of preworkout featured in a podcast episode)</div>
                  <div className="bullet">Curators are both advertisers and advertisees:</div>
                  <div className="sub-bullet">
                    as a rising curator, you may pay to show up in searches "entrepreneurship"
                  </div>
                  <div className="sub-bullet">
                    as a mature curator, you may sponsor a product or another curator
                  </div>
                </div>
                <div className={this.t("subsection", 1)}>
                  <div className="title">Data Model</div>
                  <div className="bullet">Semi-public data: Freebase / TMDB / Wikidata-like collaboratively edited database</div>
                  <div className="bullet">Private data: reviews, recommendations, etc.</div>
                </div>
                <div className={this.t("subsection", 2)}>
                  <div className="title">Collaborative Filtering</div>
                  <div className="bullet">Unlike Reddit's democratic system, we aim for a "rich get richer" system</div>
                  <div className="bullet">Key difference from Reddit:</div>
                  <div className="sub-bullet">
                    Your overall reputation affects the prominence of your recommendations
                  </div>
                  <div className="sub-bullet">
                    The similarity of other users to you affects the prominence of your recommendations
                  </div>
                  <div className="bullet">Two improvements over Reddit's model:</div>
                  <div className="sub-bullet">
                    Celebrities can actually monetize their fame
                  </div>
                  <div className="sub-bullet">
                    Your feedback directly improves your content
                  </div>
                </div>
              </div>
            </div>
          ),
          this.createTransition(),
          this.createTransition(),
        ]}
       </Impress>
      </div>
    );
  }

  private t = (className: string, transitionId: number, endId = transitionId) => {
    const currentTransitionId = (this.state.transitionId || 0);
    if (currentTransitionId >= transitionId && currentTransitionId <= endId) {
      return className + " transition current";
    } else if (currentTransitionId > endId) {
      return className + " transition past";
    } else {
      return className + " transition future";
    }
  }

  // regular text in popover slide
  private r = (text: string) => {
    return <span className={`text`}>{text}</span>
  }


  private renderToc = () => {
    const currentId = this.state.slideId;
    return <div className="toc">
      {
        values(tocData).map(c => {
          return <div className={currentId === c.id ? "active" : ""}><a key={c.id} href={`#/${c.id}`}>{c.title}</a></div>;
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

  private createNextSlide = (id: string, content: JSX.Element, classNames = ""): JSX.Element => {
    this.stepContext.y += this.stepContext.height!;
    const res = (
      <Step
        id={id}
        key={id}
        duration={DEFAULT_DURATION}
        data={Object.assign({}, this.stepContext)}
      >
        <div className={"slide background slide-aspect-ratio " + classNames}>
          <div className="logo">
            <div className="front">erasm</div>
            <div className="back">us</div>
          </div>
          <div className="footer">
            <div className="footer-left">Erasmus Technologies, Inc.</div>
            <div className="footer-right">Proprietary and Confidential</div>
          </div>
        </div>
        <div className={"slide foreground slide-aspect-ratio " + classNames}>
          { content }
        </div>
      </Step>
    );
    this.lastId = id;
    this.lastTransition = 0;
    return res;
  }

  private createTransition = (content?: JSX.Element) => {
    const id = this.lastId + "-" + (++this.lastTransition);
    return (
      <Step
        id={id}
        key={id}
        duration={DEFAULT_DURATION}
        data={Object.assign({}, this.stepContext)}
      >
        { content }
      </Step>
    );
  }
}
