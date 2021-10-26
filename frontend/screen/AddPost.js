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
import * as navigation from "../RouteNavigation"
export default function AddPost({}) {
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
      setChosenImgs([...chosenImgs, result.uri])
    }
  }
  const removePhotoHandler = (uri) => {
    const processedImgs = [...chosenImgs.filter((img) => img != uri)]
    console.log(processedImgs.length)
    setChosenImgs(processedImgs)
  }
  return (
    <View style={styles.container}>
      <NewStatusInput placeholder="Bạn đang nghĩ gì"></NewStatusInput>
      <FluidGrid
        images={chosenImgs}
        onPress={() => console.log("img pressed")}
        onRemove={removePhotoHandler}
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
