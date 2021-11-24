import React from "react"
import { StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { TabView, SceneMap } from "react-native-tab-view"

const MsgRoute = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />

const FriendRoute = () => <View style={{ flex: 1 }}></View>
const renderScene = SceneMap({
  first: FriendRoute,
  second: MsgRoute,
})
export default function Directory() {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "first", title: "Bạn bè" },
    { key: "second", title: "Tin nhắn" },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

const styles = StyleSheet.create({})
