import Radium from "radium";
import React from "react";

import { 
  Alert, Button, Modal, OverlayTrigger, Tooltip
} from "react-bootstrap";

import { deleteBucketlist } from "../../../actions/bucketlistsActions";
import { deleteItem } from "../../../actions/itemsActions";

const styles = {
  envelope: {
    display: "inline",
  },
}
@Radium
export default class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  deleteItem() {
    const { item } = this.props;
    if (this.props.type === "Bucketlist") {
      this.props.dispatch(deleteBucketlist(item.id));
    } else if (this.props.type === "Item") {
      this.props.dispatch(deleteItem(item.bucketlist, item.id));
    }
    this.close();
  }

  close() {
    this.setState({ showModal: false});
  }

  open() {
    this.setState({ showModal: true});
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">Delete {this.props.type}</Tooltip>
    );

    return (
      <span style={[styles.button]}>
          
      <div style={[styles.envelope]}>
        <OverlayTrigger placement="bottom" overlay={tooltip}>
            <Button bsClass="btn btn-primary btn-del" onClick={this.open.bind(this)}>
              <i class="fa fa-trash-o fa-1x" aria-hidden="true"></i>
            </Button>
        </OverlayTrigger>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete {this.props.type}</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Alert bsStyle="warning">
              <strong>Are you sure you want to delete this {this.props.type}</strong>
            </Alert>
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
            <Button onClick={this.deleteItem.bind(this)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>          
      </div>
      </span>
    )
  }
}