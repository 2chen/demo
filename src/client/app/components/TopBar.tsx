import * as React from "react";

interface TopBarProps {
  type: string;
  id: string;
}

export class TopBar extends React.PureComponent<TopBarProps> {

  render() {
    return (
      <div className="top-bar">
        {this.props.type}:
        {this.props.id}
      </div>
    );
  }
}
