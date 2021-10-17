import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Profile from "../screen/Profile"
export default function ProfileStack() {
  const DirStack = createNativeStackNavigator()
  return (
    <DirStack.Navigator>
      <DirStack.Screen name="Profile" component={Profile} />
    </DirStack.Navigator>
  )
}
