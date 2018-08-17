import * as React from "react";
const {Step} = require("react-impressjs");

export interface NavState {
  slideId: string;
  transitionId?: string;
}

export interface WindowSizeState {
  width: number;
  height: number;
}

export const defaultNavState: NavState = {
  slideId: "introduction",
}

export const NavContext = React.createContext(defaultNavState);

interface RawSlideDefinition {
  id: string;
  title?: string;
  content: JSX.Element;
  transitions?: string[];
}

const rawSlides: RawSlideDefinition[] = [
  {
    id: "stateOfInternet",
    title: "State of the Internet 2018",
    content: <NavContext.Consumer>
      {
        navContext => {
          return (
            <div>
              state of the internet 2018
              { navContext.slideId }
              { navContext.transitionId }
            </div>
          )
        }
      }
    </NavContext.Consumer>
  },
  {
    id: "productIntroduction",
    title: "Product Introduction",
    transitions: ["whoAreCurators", "curatorCentric"],
    content: <NavContext.Consumer>
      {
        navContext => {
          return (
            <div>
              product introduction
              { navContext.slideId }
              { navContext.transitionId }
            </div>
          )
        }
      }
    </NavContext.Consumer>
  },
];


interface SlideProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

class Slide extends React.PureComponent<SlideProps> {
  render() {
    const {id, x, y, width, height} = this.props;
    console.log(id);
    return (
      <Step
        id={id}
        duration={250}
        data={{x, y, width, height}}
      >
        { this.props.children }
      </Step>
    )
  }
}

export const transformSlidesForImpress = (size: WindowSizeState): JSX.Element[] => {
  const {width, height} = size;
  const res: JSX.Element[] = [];
  let x = 0, y = 0;
  rawSlides.forEach(slide => {
    res.push((
      <Step
        id={slide.id}
        key={slide.id}
        duration={250}
        data={{x, y, width, height}}
      >
        { slide.content }
      </Step>
    ));

    if (slide.transitions) {
      slide.transitions.forEach(transitionId => {
        const id = slide.id + "-" + transitionId;

        res.push((
          <Step
            id={id}
            key={id}
            duration={250}
            data={{x, y, width, height}}
          />
        ));
      });
    }

    x += width;
  });
  return res;
}
