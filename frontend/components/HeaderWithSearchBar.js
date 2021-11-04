import React, { useState } from "react"
import { StyleSheet, Text, View, TextInput } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { SearchBar } from "react-native-elements"
import { SafeAreaView } from "react-native-safe-area-context"

export default function HeaderWithSearchBar({ query, onChangeText }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchIcon}>
        <AntDesign name="search1" size={24} color="black" />
      </View>
      <View style={styles.searchBar}>
        <TextInput
          value={query}
          onChangeText={onChangeText}
          placeholder={"Tim kiem ban be , tin nhan"}
        />
      </View>
      <View style={styles.qrIcon}>
        <AntDesign name="qrcode" size={24} color="black" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
  },

  searchIcon: {
    padding: 5,
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginLeft: 10,
    marginRight: 10,
  },
  qrIcon: {
    padding: 5,
  },
})
