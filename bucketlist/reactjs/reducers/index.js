import { combineReducers } from "redux";

import counters from "./counters";
import bucketlists from "./bucketlistReducer";
import items from "./itemsReducer";

export default combineReducers({
  counters,
  bucketlists,
  items,
})