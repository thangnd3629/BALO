import React from "react"
import { StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { useSelector } from "react-redux"
import { TabView, SceneMap } from "react-native-tab-view"
import UserContactCard from "../components/UserContactCard"

const FriendRoute = () => (
  <View style={{ flex: 1 }}>
    <UserContactCard />
    <UserContactCard />
    <UserContactCard />
    <UserContactCard />
    <UserContactCard />
    <UserContactCard />
  </View>
)

const MsgRoute = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />

const renderScene = SceneMap({
  first: FriendRoute,
  second: MsgRoute,
})
export default function SearchScreen() {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "first", title: "Bạn bè" },
    { key: "second", title: "Tin nhắn" },
  ])

  const { query } = useSelector((state) => state.globalQueryReducer)

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
