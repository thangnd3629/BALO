import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import CustomHeader from '../components/CustomHeader'
import { Ionicons, Feather } from '@expo/vector-icons';
import { navigate } from '../RouteNavigation';

const UserInbox = props => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const onPressOption = () => {
        navigate('InboxOption', { name: props.route.params.name })
    }

    return (
        <View style={styles.container}>

            <CustomHeader hi={"hi"} label={props.route.params.name}>
                <View style={styles.headerOptionsContainer}>
                    <View style={styles.headerOptions}>
                        <TouchableOpacity>
                            <Ionicons style={{ paddingLeft: 10 }} name="call-outline" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather style={{ paddingLeft: 10 }} name="video" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressOption}>
                            <Ionicons style={{ paddingLeft: 10 }} name="options" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomHeader>

            <GiftedChat
                listViewProps={styles.inboxContainer}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </View>
    )
}

export default UserInbox

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: 60,
        width: "100%"
    },
    headerName: {
        paddingLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    },
    inboxContainer: {
        backgroundColor: "white"
    },
    headerOptionsContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    headerOptions: {
        display: 'flex',
        flexDirection: 'row'
    }

})