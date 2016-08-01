import { connect } from "react-redux"
import moment from "moment";
import React from "react"
import { Jumbotron, PageHeader, Well } from "react-bootstrap";
import { Link } from "react-router";

import { fetchBucketlists } from "../actions/bucketlistsActions";
import AddButton from "../components/AddButton";
import ButtonGroup from "../components/Well/ButtonGroup";
import Headline from "../components/Headline";
import SearchBucketlists from "../components/Bucketlist/SearchBucketlists";


var Packery = require('react-packery-component')(React);


@connect((store) => {
  return {
    bucketlists: store.bucketlists.bucketlists,
    items: store.items.items,
  };
})

export default class Bucketlist extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchBucketlists())
  }

  handleClick() {
    this.props.dispatch(increaseCounter())
  }
  
  render() {
    const { bucketlists } = this.props;
    const mappedBucketlists = bucketlists.map((bucketlist, i) => 
      <Well key={i} bsClass="well card rounded col-sm-5 col-xs-12 col-xs-offset-2">
        <div class="row">
          <ButtonGroup 
            dispatch={this.props.dispatch}
            item={bucketlist}
            type="Bucketlist">
          </ButtonGroup>
        </div>

        <Link to={"/bucketlist/" + bucketlist.id}>
          <div class="row">
            <div class="col-xs-9">
              <h2>{bucketlist.name}</h2>
            </div>
          </div>
          <p>
            {moment(bucketlist.date_modified).format("dddd, MMMM Do YYYY, h:mm:ss a")} 
          </p>
          <br />
          <br />
        </Link>
      </Well>
    );
    
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-3 col-xs-12">
              <h1 class="sub-heading">My Bucketlists</h1>
          </div>
          <div class="col-sm-6 col-xs-12 search">
            <SearchBucketlists dispatch={this.props.dispatch}></SearchBucketlists>
          </div>
        </div>
        <div class="row">
          <AddButton dispatch={this.props.dispatch} type="bucketlist"></AddButton>
        </div>
        <div class="row">
          <Packery>
            {mappedBucketlists}
          </Packery>
        </div>
      </div>
    );
  }
}