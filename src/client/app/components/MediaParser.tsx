import {AppState, EnrichedPost, Locator, Tag} from "../reducers/redux";
import * as React from "react";
import {Button, Popover, PopoverInteractionKind, Tooltip} from "@blueprintjs/core";
import {cloneDeep} from "lodash";
import {connect} from "react-redux";
import {convertTags} from "./reselect";
import {Badge} from "./MiniBadge";
import {SubmissionPopover} from "./TopBar";

const Parser = require('html-react-parser');
const domToReact = require('html-react-parser/lib/dom-to-react');
const attributesToProps = require('html-react-parser/lib/attributes-to-props');

export interface MediaParserOwnProps {
  post: EnrichedPost;
  html: string;
}

export interface MediaParserProps extends MediaParserOwnProps {
  tags: {[key: string]: Tag};
}

interface ParserNode {
  data: string;
  type: string;
  name: string;
  attribs: any;
  children: ParserNode[];
  erasmusTag?: Tag;
}


interface MediaParserState {
  url: string;
}

class UnconnectedMediaParser extends React.PureComponent<MediaParserProps, MediaParserState> {
  constructor(props: MediaParserProps) {
    super(props);
    this.state = {url: ""};
  }

  private createBadgePopover(locator: Locator, contents: any) {
    return (
      <Popover
        popoverClassName="bp3-dark"
        interactionKind={PopoverInteractionKind.HOVER}
        content={<Badge locator={locator} />}
      >
        <a id={`tag-${locator}`} className="tag" href={`#/demo?${locator}`}>{contents}</a>
      </Popover>
    )
  }

  private onPost = (url: string) => {
    this.setState({url});
  }

  private onClose = () => {
    this.setState({url: ""});
  }

  render() {
    const parserOptions = {
      replace: (arg:  ParserNode) => {
        const {type, name, attribs} = arg;
        if (arg.erasmusTag) {
          const selector = arg.erasmusTag.selector;
          if (selector.path.length === 0) {
            if (selector.position) {
              // this is a text tag
              const [start, end] = selector.position;
              return (
                <span>
                  {arg.data.substring(0, start)}
                  {this.createBadgePopover(arg.erasmusTag.locator, arg.data.substring(start, end))}
                  {arg.data.substring(end, arg.data.length)}
                </span>
              );
            } else {
              // this is an anchor tag probably
              const innerText = domToReact(arg.children, parserOptions);
              let needSpacer = (typeof innerText === "string" && innerText[0] === " ");
              return this.createBadgePopover(arg.erasmusTag.locator, [
                needSpacer && <span>&nbsp;</span>,
                domToReact(arg.children, parserOptions)
              ]);
            }
          } else {
            arg.children[selector.path.shift()!].erasmusTag = arg.erasmusTag;
          }
        }

        if (attribs && attribs.id in this.props.tags) {
          const tag = cloneDeep(this.props.tags[attribs.id]);
          arg.children[tag.selector.path.shift()!].erasmusTag = tag;
        } else if (type === "tag" && name === "a") {
          const innerText = domToReact(arg.children, parserOptions);
          let needSpacer = (typeof innerText === "string" && innerText[0] === " ");
          return (
            <Popover interactionKind={PopoverInteractionKind.HOVER}
                     hoverOpenDelay={500}
                     hoverCloseDelay={1500}
                     content={<AddItem url={arg.attribs.href} onClick={this.onPost} />}>
              <a className="untag" {...attributesToProps(arg.attribs)}>
                { needSpacer && <span>&nbsp;</span> }
                { domToReact(arg.children, parserOptions) }
              </a>
            </Popover>
          );
        }
      }
    };

    return (
      <div>
        { Parser(this.props.html, parserOptions) }
        { this.state.url && <SubmissionPopover url={this.state.url} onClose={this.onClose} /> }
      </div>
    )
  }
}

interface AddItemProps {
  url: string;
  onClick: (url: string) => void;
}

class AddItem extends React.PureComponent<AddItemProps> {
  private onPost = () => {
    this.props.onClick(this.props.url);
  }

  render() {
    return (
      <Button className="item" icon="tag" onClick={this.onPost}>
        Add this link to Erasmus
      </Button>
    );
  }
}

export const MediaParser = connect((state: AppState, props: MediaParserOwnProps) => {
  return {
    tags: convertTags(state, props),
  };
})(UnconnectedMediaParser);
