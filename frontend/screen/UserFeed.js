import React, { useEffect } from "react"
import { StyleSheet, Text, View, Image } from "react-native"
export default function UserFeed() {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image
          style={styles.backgroundImg}
          source={require("../assets/story2.jpg")}
        ></Image>
      </View>
      <View style={styles.feed_container}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundImg: {
    height: "100%",
    width: "100%",
  },
  feed_container: {
    flex: 1,
  },
})
