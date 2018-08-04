import {createBrowserHistory} from "history";
import * as React from "react";
import {Provider} from "react-redux";
import {Route, Router} from "react-router-dom";
import {createStore} from "redoodle";
import {Impress} from "react-impressjs";
import {App} from "./components/App";
import {reducers} from "./reducers";
import {INITIAL_STATE} from "./reducers/state";

import "./components/bundle.scss";

const store = createStore(reducers, INITIAL_STATE);
const history = createBrowserHistory();

export default class Root extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="" component={home}/>;
          </Route>
        </Router>
      </Provider>
    );
  }
}
