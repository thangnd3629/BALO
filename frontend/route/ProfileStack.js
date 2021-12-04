import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Profile from "../screen/Profile"
export default function ProfileStack() {
  const ProfileStack = createNativeStackNavigator()
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  )
}
