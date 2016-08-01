import Radium from "radium";
import React from "react";

import { 
  Button, Col, ControlLabel, Form, FormGroup, 
  FormControl, Modal, OverlayTrigger, Tooltip 
} from "react-bootstrap";

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

  editItem() {
    const { item } = this.props;
    if (this.props.type === "Bucketlist") {
      this.props.dispatch(editBucketlist(item.id,
                                         this.state.name));
    } else if (this.props.type === "Item") {
      this.props.dispatch(editItem(item.bucketlist,
                                   item.id,
                                   this.state.name,
                                   item.status
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

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
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
                    onChange={this.handleChange.bind(this)}
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