import {AppState, EnrichedPost, Locator, Tag} from "../reducers/redux";
import * as React from "react";
import {Popover, PopoverInteractionKind, Spinner, Tooltip} from "@blueprintjs/core";
import {cloneDeep} from "lodash";
import {connect} from "react-redux";
import {convertTags} from "./reselect";
import {Badge} from "./MiniBadge";
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

class UnconnectedMediaParser extends React.PureComponent<MediaParserProps> {
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
            <Tooltip hoverOpenDelay={500} content={<Spinner />}>
              <a className="untag" {...attributesToProps(arg.attribs)}>
                { needSpacer && <span>&nbsp;</span> }
                { domToReact(arg.children, parserOptions) }
              </a>
            </Tooltip>
          );
        }
      }
    };

    return (
      <div>
        { Parser(this.props.html, parserOptions) }
      </div>
    )
  }
}

export const MediaParser = connect((state: AppState, props: MediaParserOwnProps) => {
  return {
    tags: convertTags(state, props),
  };
})(UnconnectedMediaParser);
