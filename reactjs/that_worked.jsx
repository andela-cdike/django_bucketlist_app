// App1.jsx
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

// App1Container.jsx
import { connect } from "react-redux"
import Radium from "radium"
import React from "react"

import { increaseCounter } from "../actions/counterActions"
import Headline from "../components/Headline"

const styles = {
  button: {
    cursor: "pointer",
  },
  counter: {
    color: "blue",
    fontSize: "20px",
  }
}

@connect((store) => {
  return {
    counters: store.counters,
  };
})
@Radium
export default class Layout extends React.Component {
  handleClick() {
    this.props.dispatch(increaseCounter())
  }

  render() {
    const { counters } = this.props;
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Sample App!</Headline>
            <div style={[styles.button]} onClick={this.handleClick.bind(this)}>INCREASE</div>
            <p style={[styles.counter]} >{counters.clicks}</p>
            <p>{process.env.BASE_API_URL}</p>
          </div>
        </div>
      </div>
    )
  }
}