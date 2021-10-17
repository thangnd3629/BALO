import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Feed from "../components/Feed"
import PostToolsGroup from "../components/PostToolsGroup"
export default function NewFeeds({ navigation }) {
  return (
    <View>
      <Text>NewFeed</Text>
      <Feed
        username="Thang"
        numLikes={5}
        numComments={6}
        post_content={"hello my friend"}
        time_stamp={"5m"}
      />
      <PostToolsGroup navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({})
