import React from "react"

import { View } from "react-native"
import styled from "styled-components/native"
import OptionsMenu from "react-native-option-menu"

import Avatar from "./Avatar"

const Container = styled.View`
  flex: 1;
`
const Header = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  padding: 0 11px;
`
const Row = styled.View`
  align-items: center;
  flex-direction: row;
`
const User = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #222121;
`
const Time = styled.Text`
  font-size: 9px;
  color: #747476;
`
const Post = styled.Text`
  font-size: 12px;
  color: #222121;
  line-height: 16px;
  padding: 0 11px;
`
const Photo = styled.Image`
  margin-top: 9px;
  width: 100%;
  height: 200px;
`
const Footer = styled.View`
  padding: 0 11px;
`
const FooterCount = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 9px 0;
`
const IconCount = styled.View`
  background: #1878f3;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`
const TextCount = styled.Text`
  font-size: 11px;
  color: #424040;
`
const Separator = styled.View`
  width: 100%;
  height: 1px;
  background: #f9f9f9;
`
const FooterMenu = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 9px 0;
`
const Button = styled.TouchableOpacity`
  flex-direction: row;
  margin-right: 20px;
`
const Icon = styled.View`
  margin-right: 6px;
`
const Text = styled.Text`
  font-size: 12px;
  color: #424040;
`
const BottomDivider = styled.View`
  width: 100%;
  height: 9px;
  background: #f0f2f5;
`
import * as navigation from "../RouteNavigation"
const Feed = ({
  id,
  described,
  created,
  modified,
  like,
  comment,
  is_liked,
  image,
  video,
  author,
  state,
  is_blocked,
  can_edit,
  can_comment,
}) => {
  const editPost = () => {
    navigation.navigate("EditPost", {
      id,
      described,
      image,
      video,
    })
  }
  const deletePost = () => {}
  return (
    <>
      <Container>
        <Header>
          <Row>
            <Avatar source={require("../assets/user1.jpg")} />
            <View style={{ paddingLeft: 10 }}>
              <User>{author.name}</User>
              <Row>
                <Time>{created}</Time>
                <Entypo name="dot-single" size={12} color="#747476" />
                <Entypo name="globe" size={10} color="#747476" />
              </Row>
            </View>
          </Row>

          <OptionsMenu
            button={require("../assets/icons/more.png")}
            buttonStyle={{
              width: 64,
              height: 16,
              margin: 7.5,
              resizeMode: "contain",
            }}
            destructiveIndex={1}
            options={[can_edit ? "Edit" : null, "Delete"]}
            actions={[editPost, deletePost]}
          />
        </Header>

        <Post>{described}</Post>
        <Photo source={require("../assets/post1.jpg")} />

        <Footer>
          <FooterCount>
            <Row>
              <IconCount>
                <AntDesign name="like1" size={12} color="#FFFFFF" />
              </IconCount>
              <TextCount>{like} likes</TextCount>
            </Row>
            <TextCount>{comment} comments</TextCount>
          </FooterCount>

          <Separator />

          <FooterMenu>
            <Button>
              <Icon>
                <AntDesign name="hearto" size={24} color="black" />
              </Icon>
              <Text>Like</Text>
            </Button>

            <Button>
              <Icon>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={20}
                  color="#424040"
                />
              </Icon>
              <Text>Comment</Text>
            </Button>
          </FooterMenu>
        </Footer>
        <BottomDivider />
      </Container>
    </>
  )
}

export default Feed
