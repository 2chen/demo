import * as React from "react";
import Header from "./common/Header";

interface AppState {
  counter: number;
}

export class App extends React.Component<{}, AppState > {
  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  public componentWillMount() {
    fetch("/v1/api/counter").
    then((data: any) => this.setState(data));
  }
  public render() {
    return (
      <div className="container">
        <Header />
        <p>{this.state.counter}</p>
        {this.props.children}
      </div>
    );
  }
}
