import { connect } from "react-redux";
import moment from "moment";
import React from "react";
import { Well } from "react-bootstrap";

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
  };
})

export default class BucketlistItems extends React.Component {
  componentWillMount() {
    const { id } = this.props.routeParams;
    this.props.dispatch(fetchItems(id))
  }

  render() {
    const emptyMessage = <p>"You haven't created any items in this bucketlist"</p>;
    const { dispatch, bucketlist } = this.props;
    const mappedItems = bucketlist.items.map(
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
              { typeof mappedItems !== "undefined" ? mappedItems : emptyMessage}
            </Packery>
          </div>
        </div>
      </div>
    );
  }
}