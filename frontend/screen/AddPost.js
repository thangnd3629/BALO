import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native"
import ImageGrid from "../components/ImageGrid"
import { NewStatusInput } from "../components/NewStatusInput"
import FluidGrid from "../components/FluidGrid"
import * as ImagePicker from "expo-image-picker"
export default function AddPost({}) {
  const [statusContent, setContent] = useState("")
  const [chosenImgs, setChosenImgs] = useState([])
  const addPhotoHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setChosenImgs([...chosenImgs, result])
    }
  }
  const removePhotoHandler = (index) => {
    const processedImgs = [...chosenImgs]
    processedImgs.splice(index, 1)

    setChosenImgs(processedImgs)
  }
  return (
    <View style={styles.container}>
      <NewStatusInput
        placeholder="Bạn đang nghĩ gì"
        onChangeText={(text) => {
          setContent(text)
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
