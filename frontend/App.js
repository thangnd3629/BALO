import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import Login from "./screen/Login"
export default function App() {
  return <Login></Login>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
})
