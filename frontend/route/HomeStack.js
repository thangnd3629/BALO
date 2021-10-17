import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import AddPost from "../screen/AddPost"
import NewFeeds from "../screen/NewFeeds"
export default function HomeStack() {
  const HomeStack = createNativeStackNavigator()
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="NewFeed" component={NewFeeds} />
      <HomeStack.Screen name="AddPost" component={AddPost} />
    </HomeStack.Navigator>
  )
}
