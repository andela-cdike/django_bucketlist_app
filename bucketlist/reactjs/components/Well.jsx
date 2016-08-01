import Radium from "radium";
import React from "react";
import moment from "moment";
import { Link } from "react-router";

import ButtonGroup from "./Well/ButtonGroup";

const styles = {
  card: {
    margin: "10px"
  },
}
@Radium
export default class Well extends React.Component {
  render() {
    const { item, dispatch, type } = this.props;
    // const BucketlistDetailLink = (<Link to={\"/bucketlist/\" + item.id}>);
    // console.log(type === "Bucketlist")
    // const start_link = (type === "Bucketlist" ? {BucketlistDetailLink} : null);
    // // const end_link = (type === "Bucketlist" ? </Link> : null);
    const linkTo = "/bucketlist/";
    if (type === "Bucketlist") {
      start_link = (<Link to={linkTo + item.id}>);
      console.log("hye", start_link)
      end_link = (</Link>);
    } else {
      console.log("lie")
      start_link = null;
      end_link = null;
    }
    
    return (
      <div style={[styles.card]} class="well card col-sm-5">
        <div class="row">
          <ButtonGroup 
            dispatch={dispatch}
            item={item}
            type={type}>
          </ButtonGroup>
        </div>
        { start_link }
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
        {end_link}
      </div>
    );
  }
}