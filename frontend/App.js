import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import HeaderWithSearchBar from "./components/HeaderWithSearchBar"
import Login from "./screen/Login"
import Main from "./screen/Main"
import { NavigationContainer } from "@react-navigation/native"
import MultiFunctionItem from "./components/MultiFunctionList"

export default function App() {
  return <Main></Main>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
})
