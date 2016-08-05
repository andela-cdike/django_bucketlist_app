import Radium from "radium";
import React from "react";
import { IndexLink, Link } from "react-router";

const styles = {
  links: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#00D8FF",
  }
}

@Radium
export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
        collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";
    const showNav = location.pathname === "/" ? false : true;

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)}>
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li style={[styles.links]} activeClassName="active" onlyActiveOnIndex={true}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>
                  {showNav ? <i class="fa fa-chevron-left fa-2x" aria-hidden="true">Back to Bucketlist</i> : null}
                </IndexLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}