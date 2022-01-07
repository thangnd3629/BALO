import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import Avatar from "./Avatar"
export default function UserContactCard(props) {
  const userName = props.userName;
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.avatar}>
        <Avatar source={require("../assets/user1.jpg")} />
      </View>
      <View style={styles.contact}>
        <Text style={styles.name}> {userName} </Text>
        <View style={styles.moreTools}>
          <Feather
            style={{ marginRight: 20 }}
            name="phone-call"
            size={24}
            color="black"
          />
          <Feather
            style={{ marginRight: 20 }}
            name="video"
            size={24}
            color="black"
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor:"white",
    marginTop:5
  },
  avatar: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  contact: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  moreTools: {
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  name: {
    fontWeight: "700",
  },
})
