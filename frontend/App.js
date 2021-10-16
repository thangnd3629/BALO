import React from "react"
import Login from "./screen/Login"
import Welcome from "./screen/Welcome"
import Signup from "./screen/Signup"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider } from "react-redux"

import RootStack from "./route/RootStack"

import store from "./store"
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack></RootStack>
      </NavigationContainer>
    </Provider>
  )
}
