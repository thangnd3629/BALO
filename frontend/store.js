import { createStore, combineReducers } from "redux"
import authReducer from "./reducer/authReducer"
import searchReducer from "./reducer/searchReducer"
import globalModalReducer from "./reducer/globalModalReducer"
import { composeWithDevTools } from "redux-devtools-extension"
const rootReducer = combineReducers({
  authReducer: authReducer,
  globalQueryReducer: searchReducer,
  globalModalReducer: globalModalReducer,
})
const store = createStore(rootReducer, composeWithDevTools())
export default store
