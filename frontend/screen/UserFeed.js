import React, { useEffect } from "react"
import { StyleSheet, Text, View, Image } from "react-native"
export default function UserFeed() {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image
          style={styles.backgroundImg}
          source={require("../assets/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.png")}
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
    height: "30%",
    width: "100%",
  },
  feed_container: {
    flex: 1,
  },
})
