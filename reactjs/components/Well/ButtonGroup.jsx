import Radium from "radium";
import React from "react";

import { Button, ButtonToolbar } from "react-bootstrap";

import CheckButton from "./ButtonGroup/CheckButton";
import EditButton from "./ButtonGroup/EditButton";
import DeleteButton from "./ButtonGroup/DeleteButton";

const styles = {
  btnGroup: {
    position: "absolute",
    display: "inline-block",
    right: "18px",
    bottom: "19px"
  }
}
@Radium
export default class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showButtons() {
    this.setState({visible: !this.state.visible});
  }

  render() {
    const { token, dispatch, item, type } = this.props;
    
    return (
      <div style={[styles.btnGroup]}>
        <ButtonToolbar>
          { (this.state.visible && type === "Item") ||  item.done ? <CheckButton dispatch={dispatch} token={token} item={item} /> : null }
          { this.state.visible ? <DeleteButton dispatch={dispatch} token={token} item={item} type={type} /> : null }
          { this.state.visible ? <EditButton dispatch={dispatch} token={token} item={item} type={type} /> : null }
          <Button bsStyle="primary" onClick={this.showButtons.bind(this)}>
            <i class="fa fa-ellipsis-h fa-1x" aria-hidden="true"></i>
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}