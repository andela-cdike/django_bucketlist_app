import { connect } from "react-redux";
import moment from "moment";
import React from "react";
import { Col, Pagination, Panel, Well } from "react-bootstrap";

import { fetchItems } from "../actions/itemsActions";
import { refreshToken } from "../actions/cookieActions";

import AddButton from "../components/AddButton";
import ButtonGroup from "../components/Well/ButtonGroup";
import Headline from "../components/Headline";

import { shouldRefreshToken } from "../utils/refreshToken";


var Packery = require('react-packery-component')(React);

@connect((store) => {
  return {
    bucketlist: store.items.bucketlist,
    cookie: store.cookie.cookie,
    items: store.items.items,
    count: store.items.count,
    next: store.items.next,
    previous: store.items.previous,
  };
})

export default class BucketlistItems extends React.Component {
  constructor(props) {
    // set up state
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  componentWillMount() {
    // fetch content when component is about to mount
    const { id } = this.props.routeParams;
    this.props.dispatch(fetchItems(this.props.cookie.user_token, id))
  }

  componentWillReceiveProps() {
    // check JWT expiry time
    if (shouldRefreshToken(this.props.cookie.user_token)) {
      this.props.dispatch(refreshToken(this.props.cookie.user_token));
    }
  }


  handleChangePage(e) {
    // handles moving across multiple pages
    const { dispatch, routeParams, cookie } = this.props;
    if (e > this.state.activePage) {
      dispatch(fetchItems(cookie.user_token, routeParams.id, e));
    }
    else if (e < this.state.activePage) {
      dispatch(fetchItems(cookie.user_token, routeParams.id, e));
    }
    this.setState({ activePage: e });
  }

  render() {
    // render the component
    const itemsPerPage = 6;
    const { cookie, dispatch, bucketlist, items, count } = this.props;
    const numOfPages = Math.ceil(count / itemsPerPage);
    const emptyMessage = (
      <div class="empty-notice">
        <h3>"You haven't created any item in this bucketlist."</h3>
      </div>
    );

    // attach each item from bucketlist items to a separate card on the page
    const mappedItems = items.map(
      (item, i) => 
        <Well key={i} bsClass="well rounded card col-sm-5 col-xs-12 col-xs-offset-2">
          <div class="row">
            <ButtonGroup 
              dispatch={dispatch}
              item={item}
              token={cookie.user_token}
              type="Item">
            </ButtonGroup>
          </div>

          <div class="row">
            <div class="col-xs-9">
              <h2>{item.name}</h2>
            </div>
          </div>
          <p>
            {moment(item.date_modified).format("dddd, MMMM Do YYYY, h:mm:ss a")} 
          </p>
          <br />
          <br />
        </Well>
    )

    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1 class="sub-heading">{bucketlist.name} Items</h1>
          </div>
        </div>
        <div class="row">
          <AddButton
            dispatch={dispatch}
            parent_id={bucketlist.id}
            token={cookie.user_token}
            type="Item"
            count={count}
          >
          </AddButton>
        </div>
        <div class="row">
          <div>
            <Packery>
              { 
                mappedItems === "undefined" || mappedItems.length === 0 ?
                emptyMessage : mappedItems
              }
            </Packery>
          </div>
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