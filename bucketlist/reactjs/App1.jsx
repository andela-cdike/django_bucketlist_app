import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import App1Container from "./containers/App1Container"
import store from "./store"


class App1 extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App1Container />
      </Provider>
    )
  }
}

render(<App1/>, document.getElementById('App1'))