import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import UserFeed from "../screen/UserFeed"
import { useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
export default function Profile() {
  const [feeds, setFeeds] = useState([
    {
      id: 3,
      author: { name: "Thang" },
      like: 5,
      comment: 6,
      described: "hello my friend",
      created: "5m",
      can_edit: true,
      image: [{ uri: "" }],
    },
  ])
  return (
    <View style={styles.container}>
      <ScrollView>
        <UserFeed feeds={feeds}></UserFeed>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
})
