import React, { useState, useRef } from "react"
import { TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { Header, Icon } from "react-native-elements"
import { ERROR_MESSAGE } from "../constants/ErrorMessage"

const HeaderWithSearchBar = (props) => {
  if (props.rightComponent && !React.isValidElement(props.rightComponent)) {
    throw ERROR_MESSAGE.INVALID_RIGHT_COMPONENT_ELEMENT
  }

  const refCenterComponent = useRef(null)
  const API_PATH = props.apiPath
  const [isFocused, setIsFocused] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  const submitSearch = async () => {
    // TODO: implement submit search
  }

  const clickSearchButton = () => {
    if (refCenterComponent.current?.isFocused()) {
      refCenterComponent.current?.blur()
    } else {
      refCenterComponent.current?.focus()
    }
  }

  const centerComponent = (
    <TextInput
      style={
        isFocused
          ? { ...styles.textInput, ...styles.focusedTextInput }
          : styles.textInput
      }
      placeholder="Type here..."
      placeholderTextColor="white"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      ref={refCenterComponent}
    ></TextInput>
  )

  const leftComponent = (
    <TouchableOpacity onPress={clickSearchButton}>
      <Icon
        name={
          refCenterComponent.current?.isFocused() ? "chevron-left" : "search"
        }
        color="white"
      />
    </TouchableOpacity>
  )

  if (!props.rightComponent) {
    return (
      <Header
        containerStyle={styles.headerWrapper}
        placement="left"
        leftComponent={leftComponent}
        centerComponent={centerComponent}
      ></Header>
    )
  } else {
    return (
      <Header
        containerStyle={styles.headerWrapper}
        placement="left"
        leftComponent={leftComponent}
        centerComponent={centerComponent}
        leftComponent={props.rightComponent}
      ></Header>
    )
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    borderWidth: 1,
    borderColor: "red",
    height: 100,
  },

  textInput: {
    flex: 1,
    width: "90%",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: "white",
  },

  focusedTextInput: {
    color: "black",
    backgroundColor: "white",
  },
})

export default HeaderWithSearchBar
