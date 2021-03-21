// import all your reducers from ./reducers
import sampleApiReducer from "./reducers/sampleApiReducer";
import userReducer from "./reducers/userReducer";

// import combineReducer method from redux
import { combineReducers } from "redux";

// combine all your reducers
const allReducer = combineReducers({
  sampleAPI: sampleApiReducer,
  user: userReducer,
});

export default allReducer;
