import React, { useState, useEffect, useCallback } from "react"
import { StyleSheet, Text, View, FlatList, LogBox, Button } from "react-native"
import UserMessageBar from "../components/UserMessageBar"
import { Divider } from "react-native-paper"
import Avatar2 from "../components/Avatar2"
import { AntDesign } from "@expo/vector-icons"
import CustomHeader from "../components/CustomHeader"
import { API_URL } from "../config"

import { useSelector, useDispatch } from "react-redux"

import SockJS from "sockjs-client" // Note this line
import Stomp from "stompjs"
import useFetch from "../hook/useFetch"
import { ADD_MESSAGE, EXIT_CHAT } from "../action/types"
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
])

const getOffsetTime = (date) => {
  return "9 mins"
}

export default function Messages({ navigation }) {
  const authToken = useSelector((state) => state.authReducer.token)
  const userId = useSelector((state) => state.authReducer.user.id)
  const currentConversation = useSelector((state) => state.messageReducer)
  const send = useFetch()
  const dispatch = useDispatch()
  const inboxFetchSize = 5
  const [page, setPage] = useState(0)
  const [inbox, setInbox] = useState([])
  const [connection, setConnection] = useState(null)

  var temp = null
  var stompClient = null

  useEffect(() => {
    dispatch({ type: EXIT_CHAT })
    temp = "OKLA"
  }, [])

  //connect to socket
  const onMessageReceived = useCallback(
    (msg) => {
      const notification = JSON.parse(msg.body)

      const conversationId = notification.conversationId
      console.log("TAG in container", conversationId)
      const newMessages = convertMsgToGiftedChatFormat([notification])
      console.log("TAG in container", currentConversation)
      //update inner chat , if active
      if (conversationId === currentConversation.conversationId) {
        dispatch({
          type: ADD_MESSAGE,
          payload: {
            messages: newMessages,
          },
        })
      }
      //update lastest messages
      const updatedInbox = [...inbox]

      inbox.forEach((ib, index) => {
        if (ib.id === conversationId) {
          updatedInbox[index].lastMessage = {
            message: notification.message,
            created: notification.created,
            unread: 1,
          }
          return
        }
      })

      setInbox(updatedInbox)
    },
    [inbox, currentConversation.id]
  )
  const onConnected = () => {
    stompClient.subscribe(`/topic/user/${userId}`, onMessageReceived)
  }

  const onError = (err) => {
    console.log(err)
  }

  const connect = () => {
    sockJS = new SockJS(`${API_URL}/messenger`)
    stompClient = Stomp.over(sockJS)
    stompClient.connect(
      { "X-Auth-Token": `${authToken}` },
      onConnected,
      onError
    )
    setConnection(stompClient)
  }

  useEffect(() => {
    connect()
    return () => {
      try {
        // useEffect scoped this stompClient var
        stompClient.disconnect()
      } catch (e) {}
    }
  }, [onMessageReceived])
  //socket connected

  //fetch  inboxes
  const fetchInbox = async () => {
    try {
      const response = await send(
        `${API_URL}/conversation?size${inboxFetchSize}&page=${page}`,
        { method: "GET" },
        10000,
        true
      )
      setInbox((prev) => {
        return [...prev, ...response.body.data]
      })
    } catch (e) {}
  }

  useEffect(() => {
    fetchInbox()
  }, [])

  //utils
  const convertMsgToGiftedChatFormat = (msgList) => {
    if (msgList.length === 0) return []
    const processedMsgs = msgList.map((message, idx) => ({
      _id: message.message_id,
      text: message.message,
      createdAt: message.created,
      user: {
        _id: message.sender.id,
        name: message.sender.name,
        avatar: message.sender.avartar,
      },
    }))
    return processedMsgs
  }

  //send socket messages
  const onSendMessage = (messages, partnerId) => {
    const raw = JSON.stringify({
      toUser: partnerId,
      fromUser: userId,
      content: messages[0].text,
    })
    connection.send("/app/message", {}, raw)
    dispatch({
      type: ADD_MESSAGE,
      payload: {
        messages: messages,
      },
    })
  }

  const onEnterChat = (id, partnerId, userName) => {
    navigation.setOptions({ tabBarStyle: { display: "none" } })
    navigation.navigate("Inbox", {
      name: userName,
      onSendMessage: onSendMessage,
      id: id,
      partnerId: partnerId,
    })
  }
  const testHandler = () => {
    console.log("IN test handler=====================", temp)
  }

  const friends = [
    {
      id: "15",
      name: "this user name",
      userImg: require("../assets/user1.jpg"),
    },
  ]

  const inboxList =
    inbox.length !== 0 ? (
      <FlatList
        data={inbox}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <UserMessageBar
              onPress={onEnterChat}
              id={item.id}
              navigation={navigation}
              userName={item.partner.username}
              userImg={item.partner.avatar}
              partnerId={item.partner.id}
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
        <Button onPress={testHandler} title="TEST" />
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
