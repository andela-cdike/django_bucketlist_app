import { combineReducers } from "redux";

import cookie from "./cookieReducer";
import bucketlists from "./bucketlistReducer";
import items from "./itemsReducer";
import user from "./userReducer";

export default combineReducers({
  cookie,
  bucketlists,
  items,
  user,
})