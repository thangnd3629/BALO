import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"

import Avatar from "../components/Avatar"
export default function FriendRequestCard({
  id,
  username,
  avatar,
  onAccept,
  onDecline,
}) {
  return (
    <View style={styles.container}>
      <Avatar source={require("../assets/user1.jpg")} />

      <Text>{username}</Text>
      <Button
        title={"Dong y"}
        onPress={() => {
          onAccept(id)
        }}
      />

      <Button
        title={"Tu choi"}
        onPress={() => {
          onDecline(id)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 150,

    borderColor: "#F5F5F5",
    flexDirection: "column",
    alignItems: "center",
  },
})
