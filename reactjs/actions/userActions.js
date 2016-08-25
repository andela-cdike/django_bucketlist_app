import axios from "axios";

import { constructConfig } from "./common";
import { logoutIfTokenExpired } from "../utils/refreshToken";


const hostname = window.location.origin;


// fetches current user from the server
export function fetchUser(token, id) {
  logoutIfTokenExpired(token); // logout the user if token has expired
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
