import React from "react"
import { connect } from "react-redux"

import { increaseCounter } from "../actions/counterActions"
import Headline from "../components/Headline"

@connect((store) => {
  return {
    counters: store.counters,
  };
})

export default class SampleAppContainer extends React.Component {
  handleClick() {
    this.props.dispatch(increaseCounter())
  }

  render() {
    console.log(this.props);
    const { counters } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Sample App!</Headline>
            <div onClick={this.handleClick.bind(this)}>INCREASE</div>
            <p>{counters.clicks}</p>
            <p>{process.env.BASE_API_URL}</p>
          </div>
        </div>
      </div>
    )
  }
}