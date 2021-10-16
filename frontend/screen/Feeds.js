import React from "react"
import { StyleSheet, Text, View } from "react-native"
import PostToolsGroup from "../components/PostToolsGroup"
import AddPost from "./AddPost"
export default function Feeds({ navigation }) {
  return <AddPost navigation={navigation}></AddPost>
}

const styles = StyleSheet.create({})
