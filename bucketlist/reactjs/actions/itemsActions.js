import axios from "axios";

const hostname = window.location.origin;
const token  = document.cookie.slice(55)
const baseUrl = hostname + "/api/v1/bucketlists/"
const config = {
  headers: {'Authorization': 'Token ' + token}
};

export function fetchItems(parent_id, page=1) {
  const url = baseUrl + parent_id + "?page=" + page;
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

export function addItem(parent_id, name, done) {
  const url = baseUrl + parent_id + "/items/"
  console.log(url);
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

// export function edit
export function editItem(parent_id, id, name, done) {
  const url = baseUrl + parent_id + "/items/" + id; 
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

// export function delete
export function deleteItem(parent_id, id) {
  const url = baseUrl + parent_id + "/items/" + id;
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