import React, { Component } from "react"
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native"

export default class Comment extends Component {
  render() {
    const { comment, onDelete } = this.props
    return (
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={{ uri: comment.avatar_url }}
        ></Image>
        <TouchableOpacity
          style={styles.centerContainer}
          onLongPress={() => onDelete(comment.id)}
        >
          <View style={styles.contentContainer}>
            <TouchableOpacity>
              <Text style={styles.name}>{comment.name}</Text>
            </TouchableOpacity>
            <Text style={styles.content}>{comment.content}</Text>
          </View>
          <View style={styles.toolContainer}>
            <Text style={styles.createAt}>{comment.create_at}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  centerContainer: {
    width: "100%",
  },
  contentContainer: {
    padding: 10,
    paddingTop: 5,
    backgroundColor: "#e9ebee",
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
  },
  content: {},
  image: {
    borderRadius: 10,
  },
  toolContainer: {
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
  },
  createAt: {
    flex: 1,
    marginLeft: 10,
    color: "#808080",
  },
  likeBtn: {
    textAlign: "center",
    flex: 1,
  },
  replyBtn: {
    textAlign: "center",
    flex: 1,
  },
})
