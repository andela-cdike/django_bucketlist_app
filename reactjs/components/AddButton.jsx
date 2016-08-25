
import React from "react";
import { 
} from "react-bootstrap";
import { findDOMNode } from "react-dom";

import { addBucketlist, fetchBucketlists } from "../actions/bucketlistsActions";
import { addItem, fetchItems } from "../actions/itemsActions";

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      done: false,
    };
  }

  focusNameInput() {
    // focus on name input field when modal loads
    findDOMNode(this.refs.nameInput).focus();
  }

  addItem() {
    // add new items to both Bucketlist and bucketlist items
    const { dispatch, parent_id, token, type} = this.props;
    const { done, name } = this.state;

    if (type === "Bucketlist") {
      dispatch(addBucketlist(token, name));
      dispatch(fetchBucketlists(token))
    }
    else if (type === "Item") {
      dispatch(addItem(token, parent_id, name, done));
      dispatch(fetchItems(token, parent_id))
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
    const field = e.target.id;
    const name = e.target.value;
    this.setState({ [field]: name});
  }

  handleClick(e) {
    this.setState({ done: e.target.checked });
  }

  handleKeyPress(e) {
    // enter key should submit the form
    if (e.charCode == 13) {
      e.preventDefault();
      if (this.state.name.length > 0) {
        this.addItem();
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
      <Tooltip id="tooltip">Add {this.props.type}</Tooltip>
    );
    
    return (
      <div class="col-sm-offset-10 col-xs-offset-11">
        <OverlayTrigger placement="left" overlay={tooltip}>
          <Button bsStyle="primary" onClick={this.open.bind(this)}>
            <i class="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
          </Button>
        </OverlayTrigger>

        <Modal
          show={this.state.showModal}
          onHide={this.close.bind(this)}
          onEnter={this.focusNameInput.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add {this.props.type}</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="name" validationState={this.getValidationState()}>
                <Col componentClass={ControlLabel} sm={1}>
                  Name
                </Col>
                <Col sm={11}>
                  <FormControl 
                    value={this.state.name}
                    type="text" 
                    placeholder="Crazy list" 
                    ref="nameInput"
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}
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