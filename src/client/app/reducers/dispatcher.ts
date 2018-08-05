import {AppState} from "./redux";
import {Store} from "redux";
import {Dispatch} from "redoodle";

export class ErasmusDispatcher {
  private getState: () => AppState;
  private dispatch: Dispatch;

  constructor(store: Store<AppState>) {
    this.getState = store.getState;
    this.dispatch = store.dispatch;
  }


}
