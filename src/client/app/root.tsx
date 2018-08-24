import * as React from "react";
import {Provider} from "react-redux";
import {createStore} from "redoodle";
import {reducers} from "./reducers/redux";
import {INITIAL_STATE} from "./reducers/state";
import {debounce, values} from "lodash";

import "./components/bundle.scss";
import {ErasmusDispatcher} from "./reducers/dispatcher";
import {Demo} from "./demo/Demo";

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
    window.addEventListener("resize", this.windowResized);
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

  private windowResized = debounce(() => document.location.reload(), 500, {trailing: true});

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

  private checkUrlAndLoadSlide = () => {
    // if impress isn't loaded but we have a slide ID, then the user reloaded the page
    if (!this.impress) {
      const match = window.location.hash.match(/^#\/?([^-]*)-?(.*)/) || [];
      if (match[1]) {
        setTimeout(() => {
          window.location.href = "#/" + match[1] + (match[2] ? `-${match[2]}` : "");
        }, 0);
      }
    }
  }

  private renderSlides = () => {
    this.checkUrlAndLoadSlide();

    const {width, height} = this.state;
    this.stepContext = Object.assign({x: 0, y: 0}, this.state);
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
                  <div className="title">Axioms / Truisms</div>
                  <div className="bullet">Discovery and recommendation are two sides of the same coin</div>
                  <div className="bullet">Advertisements are a type of recommendation</div>
                  <div className="bullet">
                    <span className="bold">Improving content discovery improves advertisements</span>
                  </div>
                </div>
                <div className={this.t("subsection discovery", 1, 3)}>
                  <div className="title">
                    <div className="label">How do we discover&nbsp;
                      <strong>meaningful&nbsp;
                        <span className={this.t("content", 3)}>
                          {this.state.transitionId! >= 3 ? "books" : "content"}
                        </span>
                      </strong>?
                    </div>
                  </div>
                  <div className={this.t("bullets", 2)}>
                    <div className="bullet">
                      <div className="label">Democratized ratings</div>
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
                      <div className={this.t("example", 3)}>Book clubs, recommendations from a friend</div>
                    </div>
                  </div>
                </div>
                <div className={this.t("subsection quality", 4, 6)}>
                  <div className={this.t("title", 4, 5)}>How relevant are these recommendations?</div>
                  <div className={this.t("bad", 4)}>
                    <div className="bullet"><span className="bold">Democratized ratings</span> work well for mainstream content (e.g., Rotten Tomatoes)</div>
                    <div className="bullet"><span className="bold">Machine learning recommenders</span> are as good as the input data</div>
                    <div className="sub-bullet">Work very well in certain cases (e.g. Amazon: "Users also bought")</div>
                    <div className="sub-bullet">Personalized but not personal</div>
                  </div>
                  <div className={this.t("good", 5)}>
                    <div className="bullet">
                      <span className="bold">Eminence</span> and&nbsp;
                      <span className="bold">word-of-mouth</span> recommendations
                    </div>
                    <div className="sub-bullet">Can effectively explore across topic, platform, and medium</div>
                    <div className="sub-bullet">Effective because they are <span className="bold">personal</span></div>
                    <div className="sub-bullet"><span className="bold">Word-of-mouth</span> can create a compelling shared experience</div>
                    <div className={this.t("bullet", 6)}>
                      <strong>These recommendations are currently done ad hoc</strong>
                    </div>
                    <div className={this.t("sub-bullet", 6)}>
                      Made through email, text, tweet, blogpost, etc.
                    </div>
                    <div className={this.t("sub-bullet", 6)}>
                      Tracked through memory, note apps, bookmark, etc., and <strong>often forgotten</strong>
                    </div>
                  </div>
                </div>
                <div className={this.t("subsection gaps", 4, 6)}>
                  <div className="title">Two Clear Gaps</div>
                  <div className="bullet">No way to <span className="underline">easily</span> save and track recommendations</div>
                  <div className="bullet">No <span className="underline">single place</span> to share recommendations with friends/followers</div>
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
          this.createTransition(),
          this.createNextSlide(tocData.productIntro.id,
            <div className="slide-content">
              <div className="title">{this.r("Product Introduction")}</div>
              <div className="section">
                <div className="subsection one-liner">
                  <div className="title">{this.r("Erasmus is a")}&nbsp;
                    <span className={this.t("text underline", 1)}>curator-centric,</span><br/>
                    <span className={this.t("text underline", 2)}>cross-medium</span>&nbsp;
                    {this.r("recommendation platform")}
                  </div>
                </div>
                <div className="subsection core-features">
                  <div className="title">{this.r("Core Functionality")}</div>
                  <div className="bullet">
                    <span className={this.t("text underline", 4)}>
                      <span className="bold">Discover</span> new content, topics and curators to follow
                    </span>
                  </div>
                  <div className="bullet">
                    <span className={this.t("text underline", 5)}>
                      <span className="bold">Digest</span>: read, listen, and watch in app or browser
                    </span>
                  </div>
                  <div className="bullet">
                    <span className={this.t("text underline", 6)}>
                      <span className="bold">Recommend</span> content to friends and followers
                    </span>
                  </div>
                  <div className="bullet">
                    <span className={this.t("text underline", 7)}>
                      <span className="bold">Discuss</span> and review content, track recommendations
                    </span>
                   </div>
                </div>
                { this.state.slideId === tocData.productIntro.id && <Demo transitionId={this.state.transitionId!} /> }
              </div>
            </div>
          , this.state.transitionId! > 0 && this.state.transitionId! !== 3 ? "highlight" : ""),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createTransition(),
          this.createNextSlide(tocData.keyDifferentiators.id,
            <div className="slide-content">
              <div className="title">Key Differentiators</div>
              <div className="section">
                <div className="subsection landscape">
                  <svg>
                    <line x1={300} y1={0} x2={300} y2={300} />
                    <line x1={0} y1={150} x2={600} y2={150} />
                    <text x={310} y={20}>Social</text>
                    <text x={310} y={295}>Personal</text>
                    <text x={10} y={175}>Narrow Use Case</text>
                    <text x={425} y={175}>Broad Use Case</text>
                  </svg>
                  <div className="bubble pocket"><img src="https://getpocket.com/favicon.ico" /></div>
                  <div className="bubble goodreads"><img src="https://goodreads.com/favicon.ico" /></div>
                  <div className="bubble letterboxd"><img src="https://letterboxd.com/" /></div>
                  <div className="bubble reddit"><img src="https://reddit.com/favicon.ico" /></div>
                  <div className="bubble pinterest"><img src="https://pinterest.com/favicon.ico" /></div>
                  <div className="bubble twitter"><img src="https://twitter.com/favicon.ico" /></div>
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
                    <span className={this.t("answer", 2)}><strong>Yes!</strong></span>
                  </div>
                  <div className={this.t("answer", 2)}>
                    <div className="sub-bullet">Great data for targeting like Goodreads</div>
                    <div className="sub-bullet">Influencer-centric like Instagram</div>
                    <div className="sub-bullet">Seamless ads like Pinterest</div>
                  </div>
                </div>
                <div className={this.t("subsection zero-to-one", 3, 4)}>
                  <div className="title">Zero-to-One</div>
                  <div className="bullet">Start small with both:</div>
                  <div className="sub-bullet"><strong>Broad topics</strong> within narrow set of media: podcasts, articles, longform</div>
                  <div className="sub-bullet"><strong>Broad media</strong> within narrow set of topics: tech, entrepreneurship, self-improvement</div>
                  <div className="bullet">Build ontological model of this universe internally</div>
                  <div className="bullet">Work closely with influencers within these verticals</div>
                  <div className={this.t("bullet", 4)}><strong>We believe this is monetizable at a relatively small scale</strong></div>
                </div>
                <div className={this.t("subsection one-to-many", 5)}>
                  <div className="title">One to "Many Revenue"</div>
                  <div className="bullet">Expand media, topics, and influencer engagement</div>
                  <div className="bullet">Open source ontological framework (like TMDB)</div>
                  <div className="bullet">Monetize through</div>
                  <div className="sub-bullet">Direct ads for content/curators</div>
                  <div className="sub-bullet">Content-aware advertising</div>
                  <div className="sub-bullet">Data sharing with content creators and curators</div>
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
                  <div className="title">"Early Game" Problems</div>
                  <div className="bullet">Lack of user or influencer buy-in</div>
                  <div className="sub-bullet">Initially, users and influencers bases will overlap significantly</div>
                  <div className="sub-bullet">Well connected in user/influencer space</div>
                  <div className="sub-bullet">To influencers: pitch as "intellectual identity" platform</div>
                  <div className="sub-bullet">Iterate closely with both groups</div>

                  <div className="bullet">Bad mobile UX</div>
                  <div className="sub-bullet">StumbleUpon failed to adapt to the emerging mobile world</div>
                  <div className="sub-bullet">Mobile development landscape has improved greatly since 2009</div>
                  <div className="sub-bullet">Leverage ReactNative to share code with web</div>
                  <div className="sub-bullet">Ensure proportional representation of mobile users in beta</div>
                </div>
                <div className={this.t("subsection", 1)}>
                  <div className="title">"Late Game" Problems</div>

                  <div className="bullet">Data scale too big</div>
                  <div className="sub-bullet">Optimize for simple data model and fast user load times</div>
                  <div className="sub-bullet">Recommendation view will be calculated asynchronously</div>
                  <div className="sub-bullet">Flexible framework for future migration</div>

                  <div className="bullet">Gettin' gamed</div>
                  <div className="sub-bullet">Proactive countermeasures like Facebook login, IP tracking, etc</div>
                  <div className="sub-bullet">Data model designed to be able to retroactively deal with gaming</div>
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
                  <div className="bullet">Direct ads for content/curators</div>
                  <div className="bullet">Content-aware ads (e.g. link to a brand of pre-workout featured in a podcast episode)</div>
                  <div className="bullet">Curators are both advertisers and advertisees:</div>
                  <div className="sub-bullet">
                    As a rising curator, you may pay to show up in searches "entrepreneurship"
                  </div>
                  <div className="sub-bullet">
                    As a mature curator, you may sponsor a product or another curator
                  </div>
                  <div className="bullet">Data "sharing" with content creators and curators</div>
                </div>
                <div className={this.t("subsection", 1)}>
                  <div className="title">Data Model</div>
                  <div className="bullet"><span className="bold">"Public" (a priori) data</span></div>
                  <div className="sub-bullet">Content titles, categories, authors, and their interconnections</div>
                  <div className="sub-bullet">Can be open-sourced to leverage crowd-sourcing</div>
                  <div className="sub-bullet">Influenced by Freebase / TMDB / Wikidata</div>
                  <div className="bullet"><span className="bold">Private data:</span> Reviews, recommendations, views, etc.</div>
                </div>
                <div className={this.t("subsection", 2)}>
                  <div className="title">Collaborative Filtering</div>
                  <div className="bullet">Key differences from Reddit's model</div>
                  <div className="sub-bullet">Reddit has a "direct democratic" system</div>
                  <div className="sub-bullet">We aim for more of a <span className="bold">representative democracy</span></div>
                  <div className="sub-bullet">
                    Overall reputation affects the prominence of recommendations
                  </div>
                  <div className="sub-bullet">
                    Similarity of other users to you affects the prominence of recommendations
                  </div>
                  <div className="bullet">Resulting in two improvements:</div>
                  <div className="sub-bullet">
                    Influencers can actually <span className="bold">monetize their influence</span>
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
