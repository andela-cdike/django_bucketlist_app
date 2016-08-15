import Radium from "radium";
import React from "react";
import { 
  Button, Col, ControlLabel, Form, FormGroup, 
  FormControl, Modal, OverlayTrigger, Tooltip 
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
      name: '',
    };
  }

  focusNameInput() {
    // focus on name input field when modal loads
    findDOMNode(this.refs.nameInput).focus();
  }

  editItem() {
    const { dispatch, item, token, type } = this.props;
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
      if (this.state.name.length > 0) {
        this.editItem();
      }
    }
  }

  getValidationState() {
    // give usual cue as to whether current input is valid
    // i.e. red when empty and green otherwise
    const length = this.state.name.length;
    if (length > 0) return 'success';
    else if (length === 0) return 'error';
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
              <FormGroup controlId="Name" validationState={this.getValidationState()}>
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