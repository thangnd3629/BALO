import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import HeaderWithSearchBar from './components/HeaderWithSearchBar';

export default function App() {
  return (
    <HeaderWithSearchBar apiPath='Hello'></HeaderWithSearchBar>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
})
