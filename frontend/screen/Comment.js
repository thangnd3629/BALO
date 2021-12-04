import React, { useState } from "react"
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native"
import Comment from "../components/Comment"
import DeleteCommentModal from "../components/DeleteCommentModal"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import { FlatList } from "react-native-gesture-handler"

export default function CommentScreen() {
  const [comments, setComments] = useState([
    {
      id: 1,
      avatar_url:
        "https://upload.wikimedia.org/wikipedia/en/3/3b/URI_-_New_poster.jpg",

      name: "Thang",
      create_at: "5d",
      content: "hello",
    },
    {
      id: 2,
      avatar_url:
        "https://upload.wikimedia.org/wikipedia/en/3/3b/URI_-_New_poster.jpg",

      name: "Thang",
      create_at: "5d",
      content: "hello",
    },
  ])
  const [commentPopUpMenuID, setCommentPopUpMenu] = useState(null)
  const deleteCommentHandler = (id) => {
    setCommentPopUpMenu(id)
  }
  return (
    <View style={styles.wrapper}>
      {commentPopUpMenuID && (
        <DeleteCommentModal
          id={commentPopUpMenuID}
          onClose={() => {
            setCommentPopUpMenu(null)
          }}
        />
      )}

      <View style={styles.commentSection}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return <Comment comment={item} onDelete={deleteCommentHandler} />
          }}
        />
      </View>
      <View style={styles.commentInputWrapper}>
        <TouchableOpacity style={styles.cameraIconWrapper}>
          <FontAwesome5Icon name="camera" size={20}></FontAwesome5Icon>
        </TouchableOpacity>
        <View style={styles.textInputWrapper}>
          <TextInput autoFocus={true} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.iconItem}>
            <FontAwesome5Icon
              name="grip-horizontal"
              size={20}
            ></FontAwesome5Icon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconItem}>
            <FontAwesome5Icon name="grin-wink" size={20}></FontAwesome5Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const screenWidth = Math.round(Dimensions.get("window").width)
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  commentSection: {
    flex: 1,
    padding: 10,
  },
  commentInputWrapper: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#ddd",
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconItem: {
    width: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconWrapper: {
    backgroundColor: "#ddd",
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputWrapper: {
    height: 40,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
    backgroundColor: "#ddd",
    marginLeft: 10,
    width: screenWidth - 40 - 80 - 30 - 10,
    borderRightWidth: 0,
  },
  textInput: {
    width: "100%",
    height: 40,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  iconWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48,
    height: 40,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 0,
  },
  navigationStackBar: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  btnBack: {
    zIndex: 99,
  },
  stackBarTitle: {
    position: "absolute",
    width: screenWidth,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 40,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
})
