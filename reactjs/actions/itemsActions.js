import axios from "axios";

import { constructConfig } from "./common";
import { logoutIfTokenExpired } from "../utils/refreshToken";


const hostname = window.location.origin;
const baseUrl = hostname + "/api/v1/bucketlists/"


// fetch bucketlist items from the server
export function fetchItems(token, parent_id, page=1) {
  logoutIfTokenExpired(token); // logout the user if token has expired
  const url = baseUrl + parent_id + "?page=" + page;
  const config = constructConfig(token)
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({type: "FETCH_ITEMS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_ITEMS_REJECTED", payload: err})
      })
  }
}

// add new item to server
export function addItem(token, parent_id, name, done) {
  logoutIfTokenExpired(token); // logout the user if token has expired
  const url = baseUrl + parent_id + "/items/"
  const config = constructConfig(token)
  return function(dispatch) {
    axios.post(url, { name: name, done: done }, config)
      .then((response) => {
        dispatch({type: "ADD_ITEM_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "ADD_ITEM_REJECTED", payload: err})
      })
  }
}


// edit bucketlist item on the server
export function editItem(token, parent_id, id, name, done) {
  logoutIfTokenExpired(token); // logout the user if token has expired
  const url = baseUrl + parent_id + "/items/" + id; 
  const config = constructConfig(token)
  return function(dispatch) {
    axios.put(url, {name: name, done: done}, config)
      .then((response) => {
        dispatch({type: "EDIT_ITEM_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "EDIT_ITEM_REJECTED", payload: err})
      })
  }
}

// delete bucketlist item from server
export function deleteItem(token, parent_id, id) {
  logoutIfTokenExpired(token); // logout the user if token has expired
  const url = baseUrl + parent_id + "/items/" + id;
  const config = constructConfig(token)
  return function(dispatch) {
    axios.delete(url, config)
      .then((response) => {
        dispatch({type: "DELETE_ITEM_FULFILLED", payload: id})
      })
      .catch((err) => {
        dispatch({type: "DELETE_ITEM_REJECTED", payload: err})
      })
  }
}