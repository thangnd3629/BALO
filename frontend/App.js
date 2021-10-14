import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import Login from "./screen/Login"
import Welcome from "./screen/Welcome"
import Signup from "./screen/Signup"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider } from "react-redux"
import store from "./store"
export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
