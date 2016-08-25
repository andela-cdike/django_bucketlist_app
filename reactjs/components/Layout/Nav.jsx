import Radium from "radium";
import React from "react";
import { 
  ButtonGroup, DropdownButton, MenuItem,
  Nav, Navbar, NavItem, NavDropdown
} from "react-bootstrap";
import { connect } from "react-redux";
import { IndexLink, Link } from "react-router";

import { fetchUser } from "../../actions/userActions";


@connect((store) => {
  return {
    cookie: store.cookie.cookie,
    user: store.user.user,
  };
})

@Radium
export default class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchUser(this.props.cookie.user_token,
                                  this.props.cookie.user_id));
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
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">DoDBucket</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown eventKey={1} 
              title={<i class="fa fa-sign-out" aria-hidden="true"></i>} 
              id="basic-nav-dropdown">
              <MenuItem eventKey={1.1}>{this.props.user.username}</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={1.2} href={window.location.origin + "/logout/"}>
                Log out
              </MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}