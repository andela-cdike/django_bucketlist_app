import Radium from "radium";
import React from "react";
import { 
  Button, Col, ControlLabel, Form, FormGroup, 
  FormControl, Modal, Overlay, OverlayTrigger,
  Popover, Tooltip 
} from "react-bootstrap";
import { findDOMNode } from "react-dom";

import { editBucketlist } from "../../../actions/bucketlistsActions";
import { editItem } from "../../../actions/itemsActions";

const styles = {
  envelope: {
    display: "inline",
  },
}

@Radium
export default class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showNameInputSubmitError: false,
      name: '',
    };
  }

  focusNameInput() {
    // focus on name input field when modal loads
    findDOMNode(this.refs.nameInput).focus();
  }

  // show error message to user submits empty field
  validateNameFieldFailed() {
    if (this.state.name.length === 0) {
      this.setState({ showNameInputSubmitError: true });  
      setTimeout(() => {
        this.setState({ showNameInputSubmitError: false });  
      }, 2000)
      return true
    }
    return false
  }

  editItem() {
    const { dispatch, item, token, type } = this.props;

    if (this.validateNameFieldFailed()) {
      return;
    }

    if (type === "Bucketlist") {
      dispatch(editBucketlist(token, item.id, this.state.name));
    } else if (type === "Item") {
      dispatch(editItem(
        token, item.bucketlist, item.id, this.state.name, item.status
      ));
    }
    this.setState({ name: ""});
    this.close();
  }

  close() {
    this.setState({ showModal: false});
  }

  open() {
    this.setState({ showModal: true});
  }

  handleChange(e) {
    const name = e.target.value;
    this.setState({ name: name});
  }

  handleKeyPress(e) {
    // enter key should submit the form
    if (e.charCode == 13) {
      e.preventDefault();
      this.editItem();
    }
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">Edit {this.props.type}</Tooltip>
    );
    const placeholder = (
      this.props.type === "Bucketlist" ? "Crazy list" : "Travel to the moon"
    );

    return (
      <div style={[styles.envelope]}>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <Button bsStyle="primary" onClick={this.open.bind(this)}>
            <i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i>
          </Button>
        </OverlayTrigger>

        <Modal
          show={this.state.showModal}
          onHide={this.close.bind(this)}
          onEnter={this.focusNameInput.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {this.props.type}</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="Name">
                <Col componentClass={ControlLabel} sm={1}>
                  Name
                </Col>
                <Col sm={11}>
                  <FormControl
                    value={this.state.name}
                    type="text" 
                    placeholder={placeholder}
                    ref="nameInput"
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
                  />
                  <Overlay
                    show={this.state.showNameInputSubmitError}
                    target={() => findDOMNode(this.refs.nameInput)}
                    placement="bottom"
                  >
                    <Popover id="popover-positioned-bottom" title="Input Error">
                      This field cannot be empty
                    </Popover>
                  </Overlay>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
            <Button onClick={this.editItem.bind(this)}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>          
      </div>
    )
  }
}