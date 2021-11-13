import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"
import MyModal from "./Modal"
export default function ErrorModal({ error }) {
  const errModalShow = useSelector((state) => state.errModalReducer)
  return <MyModal></MyModal>
}

const styles = StyleSheet.create({})
