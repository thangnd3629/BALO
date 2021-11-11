import React from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import UserMessageBar from "../components/UserMessageBar"
import { Divider } from "react-native-paper"
import Avatar2 from "../components/Avatar2"
import { AntDesign } from '@expo/vector-icons'

export default function Messages({ navigation }) {
  const friends = [
    {
      id: "0"
    },
    {
      id: "1",
      name: "this user name",
      userImg: require('../assets/user1.jpg')
    },
    {
      id: "2",
      name: "this user namer",
      userImg: require('../assets/user1.jpg')
    },
    {
      id: "3",
      name: "this user namer",
      userImg: require('../assets/user1.jpg')
    },
    {
      id: "4",
      name: "this user namer",
      userImg: require('../assets/user1.jpg')
    },
    {
      id: "5",
      name: "user namer",
      userImg: require('../assets/user1.jpg')
    },
    {
      id: "6",
      name: "user namer",
      userImg: require('../assets/user1.jpg')
    }

  ]
  const users = [
    {
      id: "1",
      userName: "A",
      userImg: require('../assets/user1.jpg'),
      messageTime: "1 min",
      messageText: "Hey this is my latest text",
      fromMe: true,
      read: true,
      seen: false
    },
    {
      id: "2",
      userName: "B",
      userImg: require('../assets/user1.jpg'),
      messageTime: "Oct", //difference of time + get time unit where changes happened e.g 1h 1m & 1h 4m -> 3 mins 
      messageText: "Hey this is my latest text", //latest text 
      fromMe: true, //  allow "You: "  to show on the left of messageText if use; if user is me then fromMe = true
      read: true, // device owner read other mess  
      seen: true  // other users saw device owner mess
    },
    {
      id: "3",
      userName: "C",
      userImg: require('../assets/user1.jpg'),
      messageTime: "1 min", read: false,
      messageText: "Hey this is my latest text",
      fromMe: false,
      read: false,
      seen: true
    },
    {
      id: "4",
      userName: "D",
      userImg: require('../assets/user1.jpg'),
      messageTime: "1 min",
      messageText: "Hey this is my latest text",
      fromMe: false,
      read: false,
      seen: true
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.friendListContainer}>
        <FlatList
          data={friends}
          style={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => (item.id)}
          renderItem={({ item }) => {
            return (
              item.id !== "0" ?
                <View style={styles.friendContainer}>

                  <Avatar2 size={55} source={item.userImg} /> {/* touch opacity to navigate to add contact*/}

                  <Text numberOfLines={2} style={{
                    textAlign: "center"
                  }}>
                    {item.name}
                  </Text>
                </View> :
                <View style={styles.friendContainer}>

                  <AntDesign name="pluscircle" size={55} color="darkgrey" /> {/* touch opacity to navigate to User Profile*/}

                  <Text numberOfLines={2} style={{
                    textAlign: "center"
                  }}> Add {"\n"} contact</Text>
                </View>
            )
          }}
        />
      </View>
      <Divider />
      <FlatList
        data={users}
        keyExtractor={(item) => (item.id)}
        renderItem={({ item }) => {
          return (
            <UserMessageBar
              navigation={navigation}
              userName={item.userName}
              userImg={item.userImg}
              messageTime={item.messageTime}
              messageText={item.messageText}
              fromMe={item.fromMe}
              seen={item.seen}
              read={item.read}

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
    flex: 1
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
  }
})
