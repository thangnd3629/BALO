import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Messages from "../screen/Messages"
export default function MessageStack() {
  const DirStack = createNativeStackNavigator()
  return (
    <DirStack.Navigator>
      <DirStack.Screen name="Messages" component={Messages} />
    </DirStack.Navigator>
  )
}
