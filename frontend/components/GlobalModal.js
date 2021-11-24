import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"
import MyModal from "./Modal"
export default function GlobalModal() {
  const { isShown, status, content } = useSelector(
    (state) => state.globalModalReducer
  )
  return <MyModal></MyModal>
}

const styles = StyleSheet.create({})
