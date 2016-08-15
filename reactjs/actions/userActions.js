import axios from "axios";

const hostname = window.location.origin;

function constructConfig(token) {
  return {
    headers: {'Authorization': 'JWT ' + token}
  };
}

export function fetchUser(token, id) {
  const url = hostname + "/api/v1/users/" + id + "/";
  const config = constructConfig(token)
  return function(dispatch) {
    axios.get(url, config)
      .then((response) => {
        dispatch({type: "FETCH_USER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BUCKETLISTS_REJECTED", payload: err})
      })
  }
}
