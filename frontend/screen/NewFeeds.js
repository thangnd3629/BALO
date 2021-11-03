import React, { useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import Feed from "../components/Feed"
import PostToolsGroup from "../components/PostToolsGroup"
import ReportModal from "../components/ReportModal"
import { SafeAreaView } from "react-native-safe-area-context"
export default function NewFeeds({}) {
  const [reportFeedModalShow, setReportFeedModal] = useState(false)
  const [reportedFeedID, setReportFeedID] = useState(null)
  const reportFeedHandler = (feedId) => {
    setReportFeedModal(true)
    setReportFeedID(feedId)
  }
  const closeReportModal = () => {
    console.log("close")
    setReportFeedModal(false)
  }
  const [feeds, setFeeds] = useState([
    {
      id: 3,
      author: { name: "Thang", id: 1 },
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
    {
      id: 3,
      author: { name: "Thang", id: 1 },
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
    {
      id: 3,
      author: { name: "Thang", id: 1 },
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
      <ReportModal
        visible={reportFeedModalShow}
        feedID={reportedFeedID}
        onClose={closeReportModal}
      />

      <PostToolsGroup />
      <View style={styles.feedGroup}>
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
                onReport={reportFeedHandler}
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
  feedGroup: {
    flex: 1,
  },
})
