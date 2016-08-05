import { connect } from "react-redux"
import moment from "moment";
import React from "react"
import { Pagination, Well } from "react-bootstrap";
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
    count: store.bucketlists.count,
    next: store.bucketlists.next,
    previous: store.bucketlists.previous,
    items: store.items.items,
  };
})

export default class Bucketlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchBucketlists());
  }

  gotoPreviousPage() {
    this.props.dispatch(fetchBucketlists(this.props.previous));
  }

  handleChangePage(e) {
    console.log(e)
    if (e > this.state.activePage) {
      this.props.dispatch(fetchBucketlists(e));
    }
    else if (e < this.state.activePage) {
      this.props.dispatch(fetchBucketlists(e));
    }
    this.setState({ activePage: e });
  }
  
  render() {
    const { bucketlists, count } = this.props;
    const limit = 5;
    const numOfPages = Math.ceil(count / limit);

    console.log(bucketlists)

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
          <AddButton dispatch={this.props.dispatch} type="Bucketlist"></AddButton>
        </div>
        <div class="row">
          <Packery>
            {mappedBucketlists}
          </Packery>
        </div>
        <div class="row pagination-block">
          <Pagination
            prev
            next
            boundaryLinks
            items={numOfPages}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleChangePage.bind(this)} />
        </div>
      </div>
    );
  }
}