import { connect } from "react-redux";
import moment from "moment";
import React from "react";
import { Button, Pagination, Well } from "react-bootstrap";
import { Link } from "react-router";

import { fetchBucketlists } from "../actions/bucketlistsActions";
import { refreshToken } from "../actions/cookieActions";

import AddButton from "../components/AddButton";
import ButtonGroup from "../components/Well/ButtonGroup";
import Headline from "../components/Headline";
import SearchBucketlists from "../components/Bucketlist/SearchBucketlists";

import { shouldRefreshToken } from "../utils/refreshToken";


var Packery = require('react-packery-component')(React);


@connect((store) => {
  return {
    bucketlists: store.bucketlists.bucketlists,
    cookie: store.cookie.cookie,
    count: store.bucketlists.count,
    next: store.bucketlists.next,
    previous: store.bucketlists.previous,
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
    this.props.dispatch(fetchBucketlists(this.props.cookie.user_token));
  }

  componentWillReceiveProps() {
    // check JWT expiry time
    if (shouldRefreshToken(this.props.cookie.user_token)) {
      this.props.dispatch(refreshToken(this.props.cookie.user_token));
    }
  }

  handleChangePage(e) {
    if (e > this.state.activePage) {
      this.props.dispatch(fetchBucketlists(this.props.cookie.user_token, e));
    }
    else if (e < this.state.activePage) {
      this.props.dispatch(fetchBucketlists(this.props.cookie.user_token, e));
    }
    this.setState({ activePage: e });
  }
  
  render() {
    const { bucketlists, count, cookie, dispatch } = this.props;
    const limit = 5;
    const numOfPages = Math.ceil(count / limit);

    const mappedBucketlists = bucketlists.map((bucketlist, i) => 
      <Well key={i} bsClass="well card rounded col-sm-5 col-xs-12 col-xs-offset-2">
        <div class="row">
          <ButtonGroup 
            dispatch={dispatch}
            item={bucketlist}
            token={cookie.user_token}
            type="Bucketlist">
          </ButtonGroup>
        </div>

        <Link to={"/bucketlist/" + bucketlist.id}>
          <div class="row">
            <div class="col-xs-12">
              <h2>{bucketlist.name}</h2>
              <Button bsStyle="primary" class="pull-right">
                <i class="fa fa-eye" aria-hidden="true"></i>
              </Button>
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
            <SearchBucketlists dispatch={dispatch} token={cookie.user_token}></SearchBucketlists>
          </div>
        </div>
        <div class="row">
          <AddButton
            dispatch={dispatch}
            token={cookie.user_token}
            type="Bucketlist"
            count={count}
          >
          </AddButton>
        </div>
        <div class="row">
          <Packery>
            {mappedBucketlists}
          </Packery>
        </div>
        <div class="row pagination-block">
          {
            count > 0 ?
            <Pagination
              prev
              next
              boundaryLinks
              items={numOfPages}
              maxButtons={5}
              activePage={this.state.activePage}
              onSelect={this.handleChangePage.bind(this)} /> :
            null
          }
        </div>
      </div>
    );
  }
}