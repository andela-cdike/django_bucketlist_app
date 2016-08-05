import axios from "axios";

const hostname = window.location.origin;
const token  = "94ec049e5a50e855028dd33ce08ec52ea475a5b4"
const baseUrl = hostname + "/api/v1/bucketlists/"
const config = {
  headers: {'Authorization': 'Token ' + token}
};

export function fetchBucketlists(page=1) {
  const url = baseUrl + "?page=" + page;
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

export function searchBucketlists(query) {
  const url = baseUrl + "?q=" + query;
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

export function addBucketlist(name) {
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

// export function update
export function editBucketlist(id, name) {
  console.log("values: ", id, name)
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

// export function delete
export function deleteBucketlist(id) {
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