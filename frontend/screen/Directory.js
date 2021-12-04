import React from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as navigation from "../RouteNavigation"

export default function Directory() {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FriendRequest")
        }}
      >
        <Text>Loi moi ket ban</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // alignItems:'center',
    // justifyContent:'center'
  },
})
