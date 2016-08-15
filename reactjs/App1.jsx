import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Bucketlist from "./containers/Bucketlist";
import BucketlistItems from "./containers/BucketlistItems";
import Layout from "./containers/Layout";
import store from "./store";


class App1 extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Bucketlist}></IndexRoute>
                <Route path="bucketlist/:id" name="items" component={BucketlistItems}>
                </Route>
            </Route>
        </Router>
      </Provider>
    )
  }
}

render(<App1/>, document.getElementById('App1'))