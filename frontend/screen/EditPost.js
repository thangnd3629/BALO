import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { NewStatusInput } from "../components/NewStatusInput"
import FluidGrid from "../components/FluidGrid"

export default function EditPost({ route }) {
  const { id, described, image, video } = route.params

  return (
    <View style={styles.container}>
      <NewStatusInput placeholder={described}></NewStatusInput>
      <FluidGrid
        images={image.map((item) => item.uri)}
        onPress={() => console.log("img pressed")}
        onRemove={console.log("Not supported")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
