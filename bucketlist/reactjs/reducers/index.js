import { combineReducers } from "redux";

import bucketlists from "./bucketlistReducer";
import items from "./itemsReducer";

export default combineReducers({
  bucketlists,
  items,
})