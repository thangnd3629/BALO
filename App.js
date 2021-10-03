import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"

export default function App() {
  return (
    <View style={[styles.container]}>
      <View style={{ flex: 3, backgroundColor: "green" }} />
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          flex: 1,
          backgroundColor: "green",
        }}
      >
        <Button title={"hello"}></Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
})
