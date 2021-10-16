import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Messages from "../screen/Messages"
import Directory from "../screen/Directory"
import Feeds from "../screen/Feeds"
import Profile from "../screen/Profile"

const Tab = createBottomTabNavigator()
export default function MainStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feeds" component={Feeds} />
      <Tab.Screen name="Message" component={Messages} />
      <Tab.Screen name="Directory" component={Directory} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}
