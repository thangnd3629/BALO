import React, { useState, useEffect, useCallback } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native"
import { NewStatusInput } from "../components/NewStatusInput"
import FluidGrid from "../components/FluidGrid"
import * as ImagePicker from "expo-image-picker"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
export default function AddPost({}) {
  const [statusContent, setContent] = useState("")
  const [chosenImgs, setChosenImgs] = useState([])
  const user = useSelector((state) => state.authReducer)
  const navigation = useNavigation()
  const addPhotoHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setChosenImgs([...chosenImgs, result])
      console.log(result)
    }
  }
  const removePhotoHandler = (index) => {
    const processedImgs = [...chosenImgs]
    processedImgs.splice(index, 1)

    setChosenImgs(processedImgs)
  }

  const onPost = useCallback(() => {
    alert(statusContent)
  }, [statusContent])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="wtf" onPress={onPost} />,
    })
  }, [statusContent])

  const postNewFeedHandler = () => {
    var myHeaders = new Headers()
    myHeaders.append("X-Auth-Token", `${user.user.token}`)
    myHeaders.append("Content-Type", "application/json")

    var raw = JSON.stringify({
      describe: "test api post",
      image: chosenImgs.map((image) => image["base64"]),
    })

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }

    fetch("http://34.70.67.66:8080/api/post/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error))
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={postNewFeedHandler}>
        <Text>POST</Text>
      </TouchableOpacity>
      <NewStatusInput
        placeholder="Bạn đang nghĩ gì"
        onChangeText={(text) => {
          setContent(text)
          console.log(statusContent)
        }}
      ></NewStatusInput>
      <FluidGrid
        images={chosenImgs.map((item) => item.uri)}
        onPress={() => console.log("img pressed")}
        onRemove={removePhotoHandler}
        editable={true}
      />
      <TouchableOpacity style={styles.optionTitle} onPress={addPhotoHandler}>
        <Text style={{ fontSize: 16 }}>Add to your post</Text>
        <View style={styles.optionImagesWrapper}>
          <Image
            style={styles.optionImage}
            source={require("../assets/icons/photo.png")}
          ></Image>
          <Image
            style={styles.optionImage}
            source={require("../assets/icons/friend.png")}
          ></Image>
          <Image
            style={styles.optionImage}
            source={require("../assets/icons/emoji.png")}
          ></Image>
          <Image
            style={styles.optionImage}
            source={require("../assets/icons/gps.png")}
          ></Image>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {},
  optionTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 55,
    alignItems: "center",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },
  optionImagesWrapper: {
    flexDirection: "row",
    zIndex: 1,
    justifyContent: "space-around",
    width: "50%",
  },
})
