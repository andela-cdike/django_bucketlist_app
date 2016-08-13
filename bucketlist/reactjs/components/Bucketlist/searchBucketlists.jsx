import React from "react";

import { 
  Button, Checkbox, Col, ControlLabel, Form, FormGroup,
  FormControl, HelpBlock, Modal, OverlayTrigger, Tooltip 
} from "react-bootstrap";

import { searchBucketlists } from "../../actions/bucketlistsActions";


export default class SearchBucketlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 0) return 'success';
    else if (length === 0) return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyPress(e) {
    if (e.charCode == 13) {
      this.props.dispatch(searchBucketlists(
        this.props.token, this.state.value
      ));
    }
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl
            bsClass="search-input-box form-control"
            type="text"
            value={this.state.value}
            placeholder="Search"
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}