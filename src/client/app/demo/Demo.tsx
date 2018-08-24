import * as React from "react";
import {Icon, Intent, TagInput, TextArea} from "@blueprintjs/core";

interface DemoProps {
  transitionId: number;
}

export class Demo extends React.PureComponent<DemoProps> {

  render() {
    return (
      <div className="demo">
        <img src="iphone.png" />
        <div className="demo-sizer">
          <div className="content">
            { this.renderContent() }
          </div>
        </div>
      </div>
    );
  }

  private renderContent = () => {
    if (this.props.transitionId <= 3) {
      return (
        <div className="splash">
          <div className="graph">
            <div className="concealer"/>
            <div className="bubble erasmus">e</div>
            <div className="bubble ma"><img
              src="https://thumbor.forbes.com/thumbor/280x0/https%3A%2F%2Fblogs-images.forbes.com%2Fnicoleperlroth%2Ffiles%2F2011%2F04%2F0331_marc-andresson_400x400.jpg"/>
            </div>
            <div className="bubble sd"><img
              src="https://upload.wikimedia.org/wikipedia/commons/4/48/Stephen_J._Dubner_by_Audrey_S._Bernstein_wiki.jpg"/>
            </div>
            <div className="bubble tf"><img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Timothy_Ferriss.jpg/440px-Timothy_Ferriss.jpg"/>
            </div>
            <div className="bubble ow"><img
              src="https://timedotcom.files.wordpress.com/2018/04/time-100-oprah-winfrey.jpg?quality=85&zoom=2"/></div>
            <div className="bubble sk"><img
              src="https://res.cloudinary.com/allamerican/image/fetch/t_face_s270/https://speakerdata2.s3.amazonaws.com/photo/image/864862/CF002480_48m_RGB_1499.jpg"/>
            </div>
            <svg className="lines">
              <line x1={140} y1={200} x2={40} y2={160}/>
              <line x1={140} y1={200} x2={145} y2={110}/>
              <line x1={140} y1={200} x2={240} y2={140}/>
              <line x1={220} y1={50} x2={240} y2={140}/>
              <line x1={40} y1={160} x2={145} y2={110}/>
              <line x1={40} y1={160} x2={70} y2={80}/>
              <line x1={40} y1={160} x2={0} y2={240}/>
              <line x1={145} y1={110} x2={70} y2={80}/>
              <line x1={145} y1={110} x2={220} y2={50}/>
              <line x1={40} y1={160} x2={0} y2={100}/>
              <line x1={70} y1={80} x2={90} y2={0}/>
              <line x1={70} y1={80} x2={0} y2={10}/>
              <line x1={140} y1={0} x2={220} y2={50}/>
              <line x1={270} y1={0} x2={220} y2={50}/>
              <line x1={281} y1={70} x2={240} y2={140}/>
              <line x1={281} y1={170} x2={240} y2={140}/>
            </svg>
          </div>
          <div className="center">
            <div className="logo">
              <div className="front">erasm</div>
              <div className="back">us</div>
            </div>
            <div className="tag-line">
              Share. Discuss. Discover.
            </div>
          </div>
          <div className="login-options">
            <button className="loginBtn loginBtn--facebook">
              Login with Facebook
            </button>

            <button className="loginBtn loginBtn--google">
              Login with Google
            </button>

            <button className="loginBtn newAccountButton">
              Create New Account
            </button>

            <button className="login">
              Login
            </button>
          </div>
        </div>
      )
    } else if (this.props.transitionId === 4) {
      return (
        <div className="explore">
          <div className="nav-bar">
            <div className="nav-bar-content">
              <div className="logo">
                <div className="front">erasm</div>
                <div className="back">us</div>
              </div>
            </div>
          </div>
          <div className="feed">
            <div className="column left">
              {
                renderFeedItem({
                  recommendation: renderAttribution({
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Timothy_Ferriss.jpg/440px-Timothy_Ferriss.jpg",
                    author: "Tim Ferriss",
                    action: "published to",
                    source: "The Tim Ferriss Show",
                  }),
                  image: "https://fhww.files.wordpress.com/2018/07/ann-miura-ko-headshot-1.jpg?quality=80&strip=all&w=1200",
                  title: "Ann Miura-Ko — The Path from Shyness to World-Class Debater and Investor",
                  time: "Listen Time: 2 hrs",
                })
              }
              {
                renderFeedItem({
                  recommendation: renderAttribution({
                    image: "https://thumbor.forbes.com/thumbor/280x0/https%3A%2F%2Fblogs-images.forbes.com%2Fnicoleperlroth%2Ffiles%2F2011%2F04%2F0331_marc-andresson_400x400.jpg",
                    author: "Marc Andreessen",
                    action: "recommended in",
                    source: "Summer 2018 Book Recommendations",
                  }),
                  image: "https://images-na.ssl-images-amazon.com/images/I/81Kt59W6lkL.jpg",
                })
              }
              {
                renderFeedItem({
                  recommendation: renderAttribution({
                    image: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iylrzO0ojP_g/v0/70x70.png",
                    author: "Matt Levine",
                    action: "published in",
                    source: "Money Stuff",
                  }),
                  image: "https://cdn.wework.com/locations/image/c8bf0ea8-1283-11e8-885d-1202be33576a/20180116_WeWork_Park_Plaza_-_Common_Areas_-_Wide-3.jpg?auto=compress%2Cformat&w=1200&h=600&fit=crop",
                  title: "WeWork Accounts for Consciousness",
                  time: "Read Time: 15 min",
                })
              }
            </div>
            <div className="column right">
              {
                renderFeedItem({
                  recommendation: renderAttribution({
                    image: "https://media.newyorker.com/photos/59096d7d6552fa0be682ff8f/1:1/w_136,c_limit/eustace-400.png",
                    author: "Tad Friend",
                    action: "published in",
                    source: "New Yorker",
                  }),
                  image: "https://media.newyorker.com/photos/59097f7f2179605b11ad96e8/16:9/w_1200,h_630,c_limit/170403_r29628.jpg",
                  title: "Silicon Valley’s Quest to Live Forever",
                  time: "Read Time: 30 min",
                })
              }
              {
                renderFeedItem({
                  recommendation: renderAttribution({
                    image: "https://res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/v1/1088009/Screenshot_2017-12-26_12.21.14_pa2te7.jpg",
                    author: "Seth Godin",
                    action: "published in",
                    source: "Recommended Curator",
                  }),
                  image: "https://res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/v1/1088009/Screenshot_2017-12-26_12.21.14_pa2te7.jpg",
                  subtitle: "Being aware of your fear is smart. Overcoming it is the mark of a successful person.",
                })
              }
              {
                renderFeedItem({
                  recommendation: renderAttribution({
                    image: "https://www.forbes.com/favicon.ico",
                    author: "Forbes",
                    action: "published in",
                    source: "9 Podcasts That Will Make You 10% Smarter",
                  }),
                  image: "https://media.npr.org/assets/img/2018/08/03/npr_hibt_podcasttile_wide-a76f8e7f356efa2ab7c099f5c2b4d37e22e40408.jpg?s=1400",
                  title: "How I Built This With Guy Raz",
                  time: "50+ episodes",
                })
              }
            </div>
          </div>
        </div>
      )
    } else if (this.props.transitionId === 5 || this.props.transitionId === 6) {
      const className = this.props.transitionId === 6 ? "darken" : "";
      return (
        <div className="player">
          <div className="nav-bar">
            <div className="nav-bar-content">
              <div className="left"><Icon icon="chevron-left" iconSize={Icon.SIZE_LARGE}/></div>
              <div className="right">
                <button className="save"><Icon icon="pin" />Save</button>
                <button className="recommend"><Icon icon="comment" />Recommend</button>
              </div>
            </div>
          </div>
          <iframe sandbox="allow-same-origin allow-scripts allow-top-navigation allow-popups" scrolling="no" width="100%"
                  height="185" frameBorder="0"
                  src="https://embed.radiopublic.com/e?if=the-tim-ferriss-show-MG7paW&ge=s1!af05b" />
          <div className="attribution">
            <div>Series: <span className="highlight">The Tim Ferriss Show</span></div>
            <div>Author: <span className="highlight">Tim Ferriss</span></div>
            <div>Features: <span className="highlight">Ann Miura-Ko</span></div>
          </div>
          <div className="blurb">
            <div className="blurb-limiter">
              Ann Miura-Ko (@annimaniac) has been called “the most powerful woman in startups” by Forbes and is a lecturer in entrepreneurship at Stanford. The child of a rocket scientist at NASA, Ann is a Palo Alto native and has been steeped in technology startups from when she was a teenager. Prior to co-founding Floodgate, she worked at Charles River Ventures and McKinsey and Company. Some of Ann’s investments include Lyft, Ayasdi, Xamarin, Refinery29, JoyRun, TaskRabbit, and Modcloth.

              Given the success of her investments she was on the 2017 Midas List of top 100 venture capitalists. Ann is known for her debate skills (she placed first in the National Tournament of Champions and second in the State of California in high school) and was part of a five-person team at Yale that competed in the Robocup Competition in Paris, France. She has a BSEE from Yale and a PhD from Stanford in math modeling of computer security. She lives with her husband, three kids, and one spoiled dog. Her interests are piano, robots, and gastronomy.
            </div>
            <div className="blurb-hider" />
            <button className="read-more">Read more</button>
          </div>
          <div className="feed-title">Related and recommended</div>
          <div className="feed">
            <div className="column left">
              {
                renderFeedItem({
                  recommendation: renderAttribution({
                    image: "https://specials-images.forbesimg.com/imageserve/58eff6094bbe6f1aff45dcdc/416x416.jpg?background=000000&cropX1=2171&cropX2=3448&cropY1=699&cropY2=1975",
                    author: "Ann Miura-Ko",
                    action: "",
                    source: "Recommended Curator",
                  }),
                  image: "https://specials-images.forbesimg.com/imageserve/58eff6094bbe6f1aff45dcdc/416x416.jpg?background=000000&cropX1=2171&cropX2=3448&cropY1=699&cropY2=1975",
                  subtitle: "Investing Ninja in @Lyft, @xamarinhq, @Refinery29, @Ayasdi, PhD, Yale investment committee member, Professional Eater, Mom to 3 rascals"
                })
              }
            </div>
            <div className="column right">
              {
                renderFeedItem({
                  recommendation: renderAttribution({
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Timothy_Ferriss.jpg/440px-Timothy_Ferriss.jpg",
                    author: "Tim Ferriss",
                    action: "",
                    source: "The Tim Ferriss Show",
                  }),
                  image: "https://fhww.files.wordpress.com/2017/12/mike-maples.jpg?quality=80&strip=all",
                  title: "The Man Who Taught Me How to Invest",
                  time: "Listen time: 2 hrs"
                })
              }
            </div>
          </div>
          <div className={`darkener ${className}`} />
          { this.renderRecommender() }
        </div>
      );
    } else if (this.props.transitionId === 7) {
      return (
        <div className="chat">
          <div className="nav-bar">
            <div className="nav-bar-content">
              <div className="left"><Icon icon="chevron-left" iconSize={Icon.SIZE_LARGE}/></div>
              <div className="center">Catherine Mao</div>
            </div>
          </div>
          <div className="messages">
            { this.renderCathyMessage(
              renderFeedItem({
                recommendation: renderAttribution({
                  image: "https://www.theatlantic.com/favicon.ico",
                  author: "Robert H. Frank",
                  action: "published in",
                  source: "The Atlantic",
                }),
                image: "https://cdn.theatlantic.com/assets/media/img/2016/04/Luck_and_gratitude_DEF_web_2/facebook.jpg?1522795794",
                title: "Why Luck Matters More Than You Might Think",
              })
            )}
            { this.renderYichenMessage(<div className="text">
              <div className="blockquote">Wealthy people overwhelmingly attribute their own success to hard work rather than to factors like luck or being in the right place at the right time</div>
              Huh. Maybe reflecting on how lucky we are can be like a new form of meditation
            </div>)}
          </div>
          <div className="chat-bar">
            <Icon className="green" icon="add" />
            <Icon icon="citation" />
            <input type="text" placeholder="    Message Catherine" />
          </div>
        </div>
      )
    }

    return null;
  }

  private renderCathyMessage = (content: JSX.Element) => {
    return (
      <div className="message left">
        <div className="picture"><img src="https://media.licdn.com/dms/image/C5603AQFgUMzMrvFnCQ/profile-displayphoto-shrink_800_800/0?e=1540425600&v=beta&t=5udgTJ8_kO8uv-3uNHw8svn4wQEe8qF_E7VJXw7KI4s" /></div>
        <div className="message-content">{content}</div>
      </div>
    );
  }

  private renderYichenMessage = (content: JSX.Element) => {
    return (
      <div className="message right">
        <div className="picture"><img src="./yichenxing.png" /></div>
        <div className="message-content">{content}</div>
      </div>
    );
  }

  private renderRecommender = () => {
    const className = this.props.transitionId === 6 ? "visible" : "hidden";
    return (
      <div className={`recommender ${className}`}>
        <div className="title">
          <Icon icon="cross" />
          Recommend
        </div>
        <div className="content">
          <div className="line rating">
            <span className="label">Rating</span>
            <div>
              <Icon icon="star" iconSize={Icon.SIZE_LARGE}/>
              <Icon icon="star" iconSize={Icon.SIZE_LARGE}/>
              <Icon icon="star" iconSize={Icon.SIZE_LARGE}/>
              <Icon icon="star" iconSize={Icon.SIZE_LARGE}/>
              <Icon icon="star" iconSize={Icon.SIZE_LARGE}/>
            </div>
          </div>
          <div className="line to">
            <span className="label">To</span>
            <TagInput leftIcon="person" values={["Catherine Mao"]} />
          </div>
          <div className="message">
            <TextArea
              large={true}
              value={""}
              placeholder={"Personalize your recommendation"}
            />
            <div className="button-holder">
              <button className="submit">Recommend!</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

interface FeedItem {
  recommendation: JSX.Element;
  image: string;
  title?: string;
  time?: string;
  subtitle?: string;
}

const renderFeedItem = (props: FeedItem) => {
  return (
    <div className="item">
      {props.recommendation}
      <div className="image">
        <img src={props.image} />
      </div>
      <div className="title">
        {props.title && <span className="title">{props.title}</span>}
        {props.time && <span className="read-time">{props.time}</span>}
      </div>
      { props.subtitle && <div className="subtitle">{props.subtitle}</div> }
    </div>
  )
}

interface Attribution {
  image: string;
  author: string;
  action: string;
  source: string;
}

const renderAttribution = (props: Attribution) => {
  return (
    <div className="recommendation">
      <div className="image">
        <img src={`${props.image}`}/>
      </div>
      <div className="attribution">
        <div className="author"><span className="highlight">{props.author}</span></div>
        <div className="source">{props.source}</div>
      </div>
    </div>
  );
}
