import { createStore, combineReducers } from "redux"
import authReducer from "./reducer/authReducer"
import searchReducer from "./reducer/searchReducer"
import globalModalReducer from "./reducer/globalModalReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore, persistReducer } from "redux-persist"
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"

import AsyncStorage from "@react-native-async-storage/async-storage"
const rootReducer = combineReducers({
  authReducer: authReducer,
  globalQueryReducer: searchReducer,
  globalModalReducer: globalModalReducer,
})

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}
const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(pReducer, composeWithDevTools())
export const persistor = persistStore(store)
