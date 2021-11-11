import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Messages from "../screen/Messages"
import UserInbox from "../screen/UserInbox"
export default function MessageStack() {
  const DirStack = createNativeStackNavigator()
  const getNavigationVisibility = (route) => {
    const routeName = route.state ? route.state.routes[route.state.index].name : ''
    
    if (route.name === 'Inbox') {
      console.log(route);
      return false;
      
    }
    return true
  }
  return (
    <DirStack.Navigator>
      <DirStack.Screen name="Messages" component={Messages} />
      <DirStack.Screen
        name="Inbox"
        component={UserInbox}
        options={({route}) => ({
          title: route.params.name,
          headerBackTitleVisible: false
        })}
      />
    </DirStack.Navigator>
  )
}
