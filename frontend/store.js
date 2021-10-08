import { createStore, combineReducers } from "redux"
import authReducer from "./reducer/authReducer"
import { composeWithDevTools } from "redux-devtools-extension"
const rootReducer = combineReducers({
  authReducer: authReducer,
})
const store = createStore(rootReducer, composeWithDevTools())
export default store
