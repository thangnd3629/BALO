import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { useSelector } from "react-redux"
import AuthStack from "./AuthStack"
import MainStack from "./MainStack"
const RootStackScreen = () => {
  const RootStack = createNativeStackNavigator()
  const authInfo = useSelector((state) => state.authReducer)
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {authInfo.user ? (
        <RootStack.Screen
          name="App"
          component={MainStack}
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  )
}

export default RootStackScreen
