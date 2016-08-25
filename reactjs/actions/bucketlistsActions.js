import axios from "axios";

import { constructConfig } from "./common";
import { logoutIfTokenExpired } from "../utils/refreshToken";


const hostname = window.location.origin;
const baseUrl = hostname + "/api/v1/bucketlists/"


// Action fetches paginated bucketlists from server
// returns bucketlist received from server if successful
// otherwise returns error
export function fetchBucketlists(token, page=1) {
  logoutIfTokenExpired(token); 
  const url = baseUrl + "?page=" + page;
  const config = constructConfig(token)
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({type: "FETCH_BUCKETLISTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BUCKETLISTS_REJECTED", payload: err})
      })
  }
}

// Action queries database on server for bucketlists that match query
export function searchBucketlists(token, query) {
  logoutIfTokenExpired(token); // logout the user if token has expired
  const url = baseUrl + "?q=" + query;
  const config = constructConfig(token)
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({type: "SEARCH_BUCKETLISTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "SEARCH_BUCKETLISTS_REJECTED", payload: err})
      })
  }
}

// Creates a new bucketlist on server
export function addBucketlist(token, name) {
  logoutIfTokenExpired(token); // logout the user if token has expired
  const config = constructConfig(token)
  return function(dispatch) {
    axios.post(baseUrl, { name: name }, config)
      .then((response) => {
        dispatch({type: "ADD_BUCKETLIST_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "ADD_BUCKETLIST_REJECTED", payload: err})
      })
  }
}

// Action edits a bucketlist on the server
export function editBucketlist(token, id, name) {
  logoutIfTokenExpired(token); // logout the user if token has expired
  const config = constructConfig(token)
  return function(dispatch) {
    axios.put(baseUrl + id, {name: name}, config)
      .then((response) => {
        dispatch({type: "EDIT_BUCKETLIST_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "EDIT_BUCKETLIST_REJECTED", payload: err})
      })
  }
}

// delete bucketlist from server
export function deleteBucketlist(token, id) {
  logoutIfTokenExpired(token); // logout the user if token has expired
  const config = constructConfig(token)
  return function(dispatch) {
    axios.delete(baseUrl + id, config)
      .then((response) => {
        dispatch({type: "DELETE_BUCKETLIST_FULFILLED", payload: id})
      })
      .catch((err) => {
        dispatch({type: "DELETE_BUCKETLIST_REJECTED", payload: err})
      })
  }
}