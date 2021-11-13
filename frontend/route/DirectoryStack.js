import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Directory from "../screen/Directory"

export default function DirStack() {
  const DirStack = createNativeStackNavigator()
  return (
    <DirStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DirStack.Screen name="Directory" component={Directory} />
    </DirStack.Navigator>
  )
}
