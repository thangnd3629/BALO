import React, { useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import Feed from "../components/Feed"
import PostToolsGroup from "../components/PostToolsGroup"
export default function NewFeeds({ navigation }) {
  const [feeds, setFeeds] = useState([
    {
      id: 3,
      author: { name: "Thang" },
      like: 5,
      comment: 6,
      described: "hello my friend",
      created: "5m",
      can_edit: true,
      image: [{ uri: "" }],
    },
  ])
  return (
    <View style={styles.container}>
      <PostToolsGroup />
      <FlatList
        data={feeds}
        renderItem={({ item }) => {
          return (
            <Feed
              navigation={navigation}
              author={item.author}
              key={item.id + "1"}
              can_edit={item.can_edit}
              like={item.like}
              comment={item.comment}
              image={item.image}
              id={item.id}
              created={item.created}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
