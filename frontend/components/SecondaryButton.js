import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function SecondaryButton({ text, onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={(e) => onPress(e)}>
        <View style={styles.button}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 20,

    width: 250,
    alignItems: "center",
    padding: 7,
    backgroundColor: "#DCDCDC",
    shadowOpacity: 1,

    borderRadius: 15,
  },
  text: {
    color: "#000000",
  },
})
