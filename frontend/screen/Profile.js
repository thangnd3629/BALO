import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import UserFeed from "../screen/UserFeed"
import { useState } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { AUTH_LOGOUT } from "../action/types"
import { useDispatch } from "react-redux"
export default function Profile() {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button
          title="Logout"
          onPress={() => {
            dispatch({
              type: AUTH_LOGOUT,
            })
          }}
        />
        <UserFeed />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
})
