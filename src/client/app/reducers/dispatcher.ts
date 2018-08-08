import {AppState} from "./redux";
import {Store} from "redux";
import {Dispatch} from "redoodle";
import {memoize} from "lodash";

export interface UnfurlResult {
  ogp: {
    ogUrl: string;
    ogDescription: string;
    ogImage: [{url: string}];
    ogTitle: string;
  },
  other: {
    icon: string;
    maskIcon: string;
  }
}

export class ErasmusDispatcher {
  private getState: () => AppState;
  private dispatch: Dispatch;

  constructor(store: Store<AppState>) {
    this.getState = store.getState;
    this.dispatch = store.dispatch;
  }

  _unfurl = (url: string): Promise<UnfurlResult> => {
    return fetch("/v1/api/unfurl", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({url})
    }).then(res => res.json());
  }

  public unfurl = memoize(this._unfurl);

}
