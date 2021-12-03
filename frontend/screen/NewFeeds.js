import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import Feed from "../components/Feed"
import PostToolsGroup from "../components/PostToolsGroup"
import ReportModal from "../components/ReportModal"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
import { API_URL } from "../config"
import { useSelector, useDispatch } from "react-redux"
export default function NewFeeds({}) {
  const [reportFeedModalShow, setReportFeedModal] = useState(false)
  const [reportedFeedID, setReportFeedID] = useState(null)
  const [fetching, setfetching] = useState(false)
  const [page, setPage] = useState(0)
  const [feeds, setFeeds] = useState([])
  const auth = useSelector((state) => state.authReducer)
  const reportFeedHandler = (feedId) => {
    setReportFeedModal(true)
    setReportFeedID(feedId)
  }
  const closeReportModal = () => {
    setReportFeedModal(false)
  }

  const dispatch = useDispatch()
  const fetchNewPosts = async () => {
    console.log("run effect")
    try {
      var myHeaders = new Headers()
      myHeaders.append("X-Auth-Token", `${auth.token}`)
      myHeaders.append("Content-Type", "application/json")

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      }
      const response = await fetchWithErrHandler(
        `${API_URL}/post/get-list-post-paging}?size=5&page=${page}`,
        requestOptions,
        3000,
        dispatch
      )

      const newPost = response.data
      if (page === 0) {
        setFeeds([...feeds, ...newPost])
      }

      console.log(newPost)
    } catch (e) {}
  }
  useEffect(() => {
    fetchNewPosts()
  }, [page])

  return (
    <View style={styles.container}>
      <ReportModal
        visible={reportFeedModalShow}
        feedID={reportedFeedID}
        onClose={closeReportModal}
      />

      <PostToolsGroup />
      <View style={styles.feedGroup}>
        {feeds.length > 0 && (
          <FlatList
            data={feeds}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => {
              console.log(
                "Fetch new item======================================================================"
              )
              setPage((prevState) => prevState + 1)
            }}
            renderItem={({ item }) => {
              return (
                <Feed
                  described={item.described}
                  author={item.author}
                  can_edit={true}
                  like={item.like}
                  comment={item.comment}
                  image={item.image}
                  id={item.id}
                  created={item.createAt}
                  onReport={reportFeedHandler}
                />
              )
            }}
          />
        )}
      </View>
    </View>
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
