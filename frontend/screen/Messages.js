import React from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import UserMessageBar from "../components/UserMessageBar"
import { Divider } from "react-native-paper"
import Avatar2 from "../components/Avatar2"
import { AntDesign } from "@expo/vector-icons"
import CustomHeader from "../components/CustomHeader"
import { API_URL } from "../config"
import { useEffect } from "react"

var stompClient = null

useEffect(() => {
  connect()
}, [])

const connect = () => {
  const Stomp = require("stompjs")
  var SockJS = require("sockjs-client")
  SockJS = new SockJS(`${API_URL}/ws`)
  stompClient = Stomp.over(SockJS)
  stompClient.connect({}, onConnected, onError)
}

const onConnected = () => {
  const userID = 1
  console.log("connected")

  stompClient.subscribe(
    "/user/" + userID + "/queue/messages",
    onMessageReceived
  )
}

const onError = (err) => {
  console.log(err)
}

const onMessageReceived = (msg) => {
  const notification = JSON.parse(msg.body)
  console.log(notification)
}

const userId = "0";

const getOffsetTime = (date) =>{
  return "9 mins"
} 

export default function Messages({ navigation }) {


  const friends = [
    {
      id: "0",
    },
    {
      id: "15",
      name: "this user name",
      userImg: require("../assets/user1.jpg"),
    },
    {
      id: "25",
      name: "this user namer",
      userImg: require("../assets/user1.jpg"),
    },
    {
      id: "35",
      name: "this user namer",
      userImg: require("../assets/user1.jpg"),
    },
    {
      id: "45",
      name: "this user namer",
      userImg: require("../assets/user1.jpg"),
    },
    {
      id: "55",
      name: "user namer",
      userImg: require("../assets/user1.jpg"),
    },
    {
      id: "65",
      name: "user namer",
      userImg: require("../assets/user1.jpg"),
    },
  ]

  const data = [
    {
      id: "1",
      partner: {
        id: "11",
        username: "A",
        avatar: require('../assets/user1.jpg'),
      },
      lastmessage: {
        message: "Hey this is my latest text",
        created: "01/01/2021 01:01:01",
        unread: 0,
        senderId: "11"
      }
    },
    {
      id: "2",
      partner: {
        id: "21",
        username: "B",
        avatar: require('../assets/user1.jpg'),
      },
      lastmessage: {
        message: "Hey this is my latest text",
        created: "01/01/2021 01:01:01",
        unread: 1,
        senderId: "0"
      }
    },
    {
      id: "3",
      partner: {
        id: "33",
        username: "C",
        avatar: require('../assets/user1.jpg'),
      },
      lastmessage: {
        message: "Hey this is my latest text",
        created: "01/01/2021 01:01:01",
        unread: 0,
        senderId: "33"
      }
    }
  ]

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
      <FlatList
<<<<<<< HEAD
        data={users}
        keyExtractor={(item) => item.id}
=======
        data={data}
        keyExtractor={(item) => (item.id)}
>>>>>>> nduc4nh
        renderItem={({ item }) => {
          return (
            <UserMessageBar
              navigation={navigation}
<<<<<<< HEAD
              userName={item.userName}
              userImg={item.userImg}
              messageTime={item.messageTime}
              messageText={item.messageText}
              fromMe={item.fromMe}
              seen={item.seen}
              read={item.read}
=======
              userName={item.partner.username}
              userImg={item.partner.avatar}
              messageTime={getOffsetTime(item.lastmessage.created)}
              messageText={item.lastmessage.message}
              fromMe={item.lastmessage.senderId === userId}
              seen={(item.lastmessage.senderId === userId) && (item.lastmessage.unread == 1)}
              read={(item.lastmessage.senderId === userId) && (item.lastmessage.unread == 0)}

>>>>>>> nduc4nh
              user={item} // you can remove these props above and only use this
            />
          )
        }}
      />
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
