import React, { useEffect } from "react"
import { StyleSheet, Text, View, Image, FlatList } from "react-native"
import Feed from "../components/Feed"
import PostToolsGroup from "../components/PostToolsGroup"
import HorizontalOptions from "../components/HorizontalOptions"
import ProfileGroup from "../components/ProfileGroup"
export default function UserFeed({ feeds }) {
  const sections = {
    data: [
      {
        content: "Image",
        colors: ["#D3959B", "#BFE6BA"],
      },
      {
        content: "Video",
        colors: ["#3E5151", "#DECBA4"],
      },
      {
        content: "Memories",
        colors: ["#FC466B", "#3F5EFB"],
      },
    ],
  }
  // ! still need to call api from sv to get user
  const user = {
    id: "id",
    name: "This is name section",
    bio: "This is bio section",
    avatar: require("../assets/user2.jpg"),
    background: require("../assets/story2.jpg")
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <ProfileGroup avatar={user.avatar} backgroundImage={user.background} name={user.name} bio={user.bio} />
      </View>

      <View style={styles.feed_container}>
        <View style={styles.options}>
          <HorizontalOptions sections={sections} />
        </View>

        <PostToolsGroup />
        <FlatList
          data={feeds}
          renderItem={({ item }) => {
            return (
              <Feed
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  options: {
    flex: 1,
    marginLeft: 10,
    height: 100,
  },
  backgroundImg: {
    height: 180,
    width: "100%",
  },
  feed_container: {
    flex: 1,
    marginTop: "10%",
  },
  avatarContainer: {
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 200,
    position: "absolute",
    alignSelf: "center",
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  blueCircle: {
    height: "95%",
    width: "95%",
    borderRadius: 200,
    borderWidth: 2,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: "95%",
    width: "95%",
    borderRadius: 200,
  },
  name: {
    alignSelf: "center",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 30,
  },
  shortBio: {
    alignSelf: "center",
    fontSize: 16,
    color: "#BBBFB6",
  },
})
