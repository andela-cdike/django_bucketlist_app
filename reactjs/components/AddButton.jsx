import React from "react";
import { 
    Button, Col, Checkbox, ControlLabel, Form,
    FormGroup, FormControl, Modal, Overlay,
    Popover, Tooltip 
} from "react-bootstrap"
import { findDOMNode } from "react-dom";

import { addBucketlist, fetchBucketlists } from "../actions/bucketlistsActions";
import { addItem, fetchItems } from "../actions/itemsActions";

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showTooltip: false,
      showNameInputSubmitError: false,
      name: '',
      done: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.count === 0) {
        this.setState({ showTooltip: true});
      }
    }, 2000);
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

  addItem() {
    // add new items to both Bucketlist and bucketlist items
    const { dispatch, parent_id, token, type} = this.props;
    const { done, name } = this.state;

    if (this.validateNameFieldFailed()) {
      return;
    }

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

  // store name field in a state
  handleChange(e) {
    const field = e.target.id;
    const name = e.target.value;
    this.setState({ [field]: name});
  }

  // store checkbox value in state
  handleClick(e) {
    this.setState({ done: e.target.checked });
  }

  // enter key should submit the form
  handleKeyPress(e) {
    if (e.charCode == 13) {
      e.preventDefault();
      this.addItem();
    }
  }

  // show tooltip
  toggleTooltipOn() {
    this.setState({ showTooltip: true});
  }

  // hide tooltip
  toggleTooltipOff() {
    this.setState({ showTooltip: false});
  }

  render() {
    return (
      <div class="col-sm-offset-10 col-xs-offset-11">
        <div id="add-button"> 
          <Button
            bsStyle="primary"
            ref="addButton"
            onMouseEnter={this.toggleTooltipOn.bind(this)}
            onMouseLeave={this.toggleTooltipOff.bind(this)}
            onClick={this.open.bind(this)}
          >
            <i class="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
          </Button>

          <Overlay
            show={this.state.showTooltip}
            target={() => findDOMNode(this.refs.addButton)}
            placement="left"
          >
            <Tooltip id="tooltip">Add {this.props.type}</Tooltip>
          </Overlay>
        </div>

        <Modal
          show={this.state.showModal}
          onHide={this.close.bind(this)}
          onEnter={this.focusNameInput.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add {this.props.type}</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="name">
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