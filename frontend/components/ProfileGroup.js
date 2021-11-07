import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

const ProfileGroup = ({avatar, background, name, bio}) => {
    return (
        <View>
            <Image
                style={styles.backgroundImg}
                source={require("../assets/story2.jpg")}
            ></Image>
            <View style={styles.avatarContainer}>
                <View style={styles.blueCircle}>
                    <Image style={styles.avatar} source={require("../assets/user2.jpg")}></Image>
                </View>
            </View>
            <Text style={styles.name}>Name</Text>
            <Text style={styles.shortBio}> This is bio Section</Text>
        </View>
    )
}

export default ProfileGroup

const styles = StyleSheet.create({
    backgroundImg: {
      height: 180,
      width: "100%",
    },
    avatarContainer:{
      backgroundColor:"white",
      height:100,
      width:100,
      borderRadius:200,
      position:'absolute',
      alignSelf:"center",
      marginTop:100,
      alignItems:"center",
      justifyContent:"center"
    },
    blueCircle:{
      height:"95%",
      width:"95%",
      borderRadius:200,
      borderWidth:2,
      borderColor:'blue',
      alignItems:"center",
      justifyContent:"center"
    },
    avatar:{
      height:"95%",
      width:"95%",
      borderRadius:200
    },
    name:{
      alignSelf:"center",
      marginTop:20,
      fontWeight:"bold",
      fontSize:30
    },
    shortBio:{
      alignSelf:"center",
      fontSize:16,
      color:"#BBBFB6"
    }
  })
