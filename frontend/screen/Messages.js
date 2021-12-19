import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import UserMessageBar from "../components/UserMessageBar"
import { Divider } from "react-native-paper"
import Avatar2 from "../components/Avatar2"
import { AntDesign } from "@expo/vector-icons"
import CustomHeader from "../components/CustomHeader"
import { API_URL } from "../config"

import { useSelector } from "react-redux"

import SockJS from "sockjs-client" // Note this line
import Stomp from "stompjs"
import useFetch from "../hook/useFetch"
const getOffsetTime = (date) => {
  return "9 mins"
}

export default function Messages({ navigation }) {
  const authToken = useSelector((state) => state.authReducer.token)
  const send = useFetch()
  const inboxFetchSize = 5
  const [page, setpage] = useState(0)
  const [data, setdata] = useState([])
  var stompClient = null
  useEffect(() => {
    connect()
  }, [])

  const connect = () => {
    sockJS = new SockJS(`${API_URL}/messenger`)
    stompClient = Stomp.over(sockJS)
    stompClient.connect(
      { "X-Auth-Token": `${authToken}` },
      onConnected,
      onError
    )
  }
  const onConnected = () => {}

  const onError = (err) => {
    console.log(err)
  }

  const onMessageReceived = (msg) => {
    const notification = JSON.parse(msg.body)
    console.log(notification)
  }

  const userId = "0"

  const friends = [
    {
      id: "15",
      name: "this user name",
      userImg: require("../assets/user1.jpg"),
    },
  ]

  const fetchInbox = async () => {
    try {
      const response = await send(
        `${API_URL}/conversation?size${inboxFetchSize}&page=${page}`,
        { method: "GET" },
        10000,
        true
      )
      setdata((prev) => [...prev, ...response.body.data])
    } catch (e) {}
  }

  useEffect(() => {
    fetchInbox()
  }, [])

  const inboxList =
    data.length !== 0 ? (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <UserMessageBar
              navigation={navigation}
              userName={item.partner.username}
              userImg={item.partner.avatar}
              messageTime={getOffsetTime(item.lastMessage.created)}
              messageText={item.lastMessage.message}
              fromMe={item.lastMessage.senderId === userId}
              seen={
                item.lastMessage.senderId === userId &&
                item.lastMessage.unread == 1
              }
              read={
                item.lastMessage.senderId === userId &&
                item.lastMessage.unread == 0
              }
              user={item} // you can remove these props above and only use this
            />
          )
        }}
      />
    ) : null

  return (
    <View style={styles.container}>
      <CustomHeader label={"Messages"} navigation={navigation} />
      <View style={styles.friendListContainer}>
        <FlatList /* horizontal flat list showing friend list*/
          data={friends}
          style={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return item.id !== "0" ? (
              <View style={styles.friendContainer}>
                <Avatar2
                  size={55}
                  source={
                    item.userImg
                  } /* touch opacity to navigate to User Profile*/
                />

                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            ) : (
              <View style={styles.friendContainer}>
                <AntDesign
                  name="pluscircle"
                  size={55}
                  color="darkgrey" /* touch opacity to navigate to User Profile*/
                />

                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Add {"\n"} contact
                </Text>
              </View>
            )
          }}
        />
      </View>
      <Divider />
      {inboxList}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  friendListContainer: {
    width: "100%",
    height: 120,
    paddingTop: 13,
  },
  inboxListContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
  },
  friendContainer: {
    display: "flex",
    width: 100,
    paddingLeft: 13,
    flexDirection: "column",
    alignItems: "center",
  },
})
