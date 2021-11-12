import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

const UserInbox = () => {
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

    return (
        <GiftedChat
            listViewProps={styles.inboxContainer}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}

export default UserInbox

const styles = StyleSheet.create({
    inboxContainer: {
        backgroundColor: "white"
    }
})