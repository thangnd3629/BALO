import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeStack from "./HomeStack"
import MessageStack from "./MessageStack"
import DirStack from "./DirectoryStack"
import ProfileStack from "./ProfileStack"

const Tab = createBottomTabNavigator()
export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Message" component={MessageStack} />
      <Tab.Screen name="Directory" component={DirStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  )
}
