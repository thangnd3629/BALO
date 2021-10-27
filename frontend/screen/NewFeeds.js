import React, { useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import Feed from "../components/Feed"
import PostToolsGroup from "../components/PostToolsGroup"
import HeaderWithSearchBar from "../components/HeaderWithSearchBar"
import { SafeAreaView } from "react-native-safe-area-context"
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
      image: [
        {
          uri: "https://reactnative.dev/img/tiny_logo.png",
        },
        {
          uri: "https://www.w3schools.com/w3images/fjords.jpg",
        },
        {
          uri: "https://tinypng.com/images/social/website.jpg",
        },
      ],
    },
  ])
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <HeaderWithSearchBar />
        <PostToolsGroup />
        <FlatList
          data={feeds}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Feed
                described={item.described}
                author={item.author}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
