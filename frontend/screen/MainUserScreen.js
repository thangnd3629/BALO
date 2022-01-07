import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Avatar2 from '../components/Avatar2'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const MainUserScreen = ({navigation}) => {
    const user = useSelector((state) => state.authReducer.user)
    const dispatch = useDispatch()

    return (
        <View>
            <TouchableOpacity
            onPress={() => {
                navigation.navigate("Profile")
            }}>
                <View style={styles.mainBar}>
                    <Avatar2 source={user.avatar ? user.avatar : require("../assets/user2.jpg")} size={70} />
                    <View style={styles.textSection}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 17
                        }}>
                            {user.userName}
                        </Text>
                        <Text style={{
                            fontSize: 15,
                            color: "#757575"
                        }}>
                            Di chuyển tới trang cá nhân
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    dispatch({
                        type: AUTH_LOGOUT,
                    })
                }}>
                <View style={styles.subBar}>
                    <Ionicons name="exit-outline" size={24} />
                    <Text style={{
                        marginLeft: 20
                    }}>Đăng xuất</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MainUserScreen

const styles = StyleSheet.create({
    mainBar: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        height: 100,
        marginTop: 5,
        padding: 10,
        alignItems: "center"
    },
    textSection: {
        marginLeft: 20
    },
    subBar: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        height: 50,
        marginTop: 5,
        padding: 10,
        alignItems: "center"
    }
})
