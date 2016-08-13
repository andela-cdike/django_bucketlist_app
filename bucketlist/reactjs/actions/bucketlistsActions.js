import axios from "axios";


const hostname = window.location.origin;
const baseUrl = hostname + "/api/v1/bucketlists/"

function constructConfig(token) {
  return {
    headers: {'Authorization': 'JWT ' + token}
  };
}

export function fetchBucketlists(token, page=1) {
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

export function searchBucketlists(token, query) {
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

export function addBucketlist(token, name) {
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

// export function update
export function editBucketlist(token, id, name) {
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

// export function delete
export function deleteBucketlist(token, id) {
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