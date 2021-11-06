import { createStore, combineReducers } from "redux"
import authReducer from "./reducer/authReducer"
import searchReducer from "./reducer/searchReducer"
import { composeWithDevTools } from "redux-devtools-extension"
const rootReducer = combineReducers({
  authReducer: authReducer,
  globalQueryReducer: searchReducer,
})
const store = createStore(rootReducer, composeWithDevTools())
export default store
