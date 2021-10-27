import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeStack from "./HomeStack"
import MessageStack from "./MessageStack"
import DirStack from "./DirectoryStack"
import ProfileStack from "./ProfileStack"

const Tab = createBottomTabNavigator()
export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="MessageStack" component={MessageStack} />
      <Tab.Screen name="DirectoryStack" component={DirStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  )
}
