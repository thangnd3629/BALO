import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import HeaderWithSearchBar from "./components/HeaderWithSearchBar"
import Login from "./screen/Login"
import Welcome from "./screen/Welcome"
import Signup from "./screen/Signup"
export default function App() {
  return <Signup></Signup>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
})
