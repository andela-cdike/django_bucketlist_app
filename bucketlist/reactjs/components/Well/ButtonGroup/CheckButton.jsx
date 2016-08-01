import Radium from "radium";
import React from "react";

import { 
    Button, ControlLabel, Form, FormGroup, FormControl,
    Modal, OverlayTrigger, Tooltip 
} from "react-bootstrap"

import { editItem } from "../../../actions/itemsActions"

const styles = {
  envelope: {
    display: "inline",
  },
}
@Radium
export default class CheckButton extends React.Component {
  checkItem() {
    const { item } = this.props;
    this.props.dispatch(editItem(item.bucketlist,
                                item.id,
                                item.name,
                                !item.done
    ));
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">Check Item</Tooltip>
    );
    const btnStyle = this.props.item.done ? "success" : "primary";
    const btnClass = "btn btn-" + btnStyle + " btn-del";

    return (
      <div style={[styles.envelope]}>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <Button bsClass={btnClass} onClick={this.checkItem.bind(this)}>
            <i class="fa fa-check fa-1x" aria-hidden="true"></i>
          </Button>
        </OverlayTrigger>
      </div>
    )
  }
}