import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { HIDE_MODAL } from "../action/types"
import MyModal from "./Modal"
export default function GlobalModal() {
  const { isShown, status, content } = useSelector(
    (state) => state.globalModalReducer
  )
  const dispatch = useDispatch()
  const modalOncloseHandler = () => {
    dispatch({
      type: HIDE_MODAL,
    })
  }
  return (
    <MyModal visible={isShown} onClose={modalOncloseHandler}>
      <Text>{content}</Text>
    </MyModal>
  )
}

const styles = StyleSheet.create({})
