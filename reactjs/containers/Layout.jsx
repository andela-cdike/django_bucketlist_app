import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import { fetchCookies } from "../actions/cookieActions";
import Footer from "../components/Layout/Footer.jsx";
import Nav from "../components/Layout/Nav.jsx";

@connect((store) => {
  return {
    cookie: store.cookie.cookie,
  };
})

// This component wraps all other components within the app
export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchCookies());
  }

  render() {
    const { location } = this.props;
    const containerStyle = {
        marginTop: "60px",
        paddingBottom: "10px"
    };
    
    return (
      <div>
        <Nav location={location} />

        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">
                {this.props.children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}