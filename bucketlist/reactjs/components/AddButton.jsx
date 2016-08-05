import React from "react";

import { 
  Button, Checkbox, Col, ControlLabel, Form, FormGroup,
  FormControl, Modal, OverlayTrigger, Tooltip 
} from "react-bootstrap";

import { addBucketlist } from "../actions/bucketlistsActions";
import { addItem } from "../actions/itemsActions";

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      done: false,
    };
  }

  addItem() {
    if (this.props.type === "Bucketlist") {
      this.props.dispatch(addBucketlist(this.state.name));
    }
    else if (this.props.type === "Item") {
      this.props.dispatch(addItem(this.props.parent_id,
                                  this.state.name,
                                  this.state.done));
    }
    this.setState({ name: "", done: false });
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleChange(e) {
    const name = e.target.value;
    this.setState({ name: name});
  }

  handleClick(e) {
    this.setState({ done: e.target.checked });
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">Add {this.props.type}</Tooltip>
    );
    
    return (
      <div class="col-sm-offset-10 col-xs-offset-11">
        <OverlayTrigger placement="left" overlay={tooltip}>
          <Button bsStyle="primary" onClick={this.open.bind(this)}>
            <i class="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
          </Button>
        </OverlayTrigger>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add {this.props.type}</Modal.Title>
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
                    placeholder="Crazy list" 
                    onChange={this.handleChange.bind(this)}
                  />
                </Col>
              </FormGroup>
              { this.props.type === "Item" ?
                <FormGroup>
                  <Col smOffset={1} sm={11}>
                    <Checkbox onClick={this.handleClick.bind(this)}>Done</Checkbox>
                  </Col>
                </FormGroup>
                : null
              }
            </Form>
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
            <Button onClick={this.addItem.bind(this)}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>          
      </div>
    )
  }
}