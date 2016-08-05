import { connect } from "react-redux";
import moment from "moment";
import React from "react";
import { Col, Pagination, Panel, Well } from "react-bootstrap";

import { fetchItems } from "../actions/itemsActions";
import AddButton from "../components/AddButton";
import ButtonGroup from "../components/Well/ButtonGroup";
import Headline from "../components/Headline";

var Packery = require('react-packery-component')(React);

@connect((store) => {
  return {
    bucketlists: store.bucketlists.bucketlists,
    bucketlist: store.items.bucketlist,
    items: store.items.items,
    count: store.items.count,
    next: store.items.next,
    previous: store.items.previous,
  };
})

export default class BucketlistItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  componentWillMount() {
    const { id } = this.props.routeParams;
    this.props.dispatch(fetchItems(id))
  }

  handleChangePage(e) {
    const { id } = this.props.routeParams;
    console.log(e)
    if (e > this.state.activePage) {
      this.props.dispatch(fetchItems(id, e));
    }
    else if (e < this.state.activePage) {
      this.props.dispatch(fetchItems(id, e));
    }
    this.setState({ activePage: e });
  }

  render() {
    const itemsPerPage = 6;
    const { dispatch, bucketlist, items, count } = this.props;
    const numOfPages = Math.ceil(count / itemsPerPage);
    const emptyMessage = (
      <div class="empty-notice">
        <h3>"You haven't created any item in this bucketlist."</h3>
      </div>
    );
    console.log(items)
    const mappedItems = items.map(
      (item, i) => 
        <Well key={i} bsClass="well rounded card col-sm-5 col-xs-12 col-xs-offset-2">
          <div class="row">
            <ButtonGroup 
              dispatch={dispatch}
              item={item}
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
    console.log("hi", mappedItems.length === 0)
    
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
            type="Item"
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
            mappedItems.length > 0 ?
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