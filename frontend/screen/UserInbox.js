import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Button } from 'react-native'
import { GiftedChat, InputToolbar, Send, Composer } from 'react-native-gifted-chat'
import CustomHeader from '../components/CustomHeader'
import { Ionicons, Feather } from '@expo/vector-icons';
import { navigate } from '../RouteNavigation';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from '../utils/Emoji';
import { toArray } from "react-emoji-render";

const emoji = new Emoji()

const UserInbox = props => {
    const [messages, setMessages] = useState([]);
    const [text,setText] = useState("")

    const onChangeTextHandle = (string) =>{
        let rawString = emoji.reverseParse(string)
        setText(rawString)

        console.log(string+","+rawString);
    }

    const renderInput = props => {
        const { text, messageIdGenerator, user, onSend } = props
        return (
            <View {...props} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white" }}>
                <TouchableOpacity>
                    <FontAwesome style={{ paddingLeft: 5 }} name="picture-o" size={24} color="#ddddd1" />
                </TouchableOpacity>
                
                <Composer  {...props} />
                
                <TouchableOpacity onPress={() => { if (text && onSend) { onSend({ text: text.trim(), user: user, _id: messageIdGenerator() }, true); } }}>
                    <Ionicons style={{ paddingLeft: 10, paddingRight: 5 }} name="send" size={24} color="blue" />
                </TouchableOpacity>
            </View>

        )

    }

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
        navigate('InboxOption', { name: props.route.params.name, nav: props.route.params.nav })
    }

    return (
        <View style={styles.container}>

            <CustomHeader label={props.route.params.name} navigation={props.route.params.nav}>
                <View style={styles.headerOptionsContainer}>
                    <View style={styles.headerOptions}>
                        <TouchableOpacity>
                            <Ionicons style={{ paddingLeft: 25 }} name="call-outline" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather style={{ paddingLeft: 25 }} name="video" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressOption}>
                            <Ionicons style={{ paddingLeft: 25 }} name="options" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomHeader>
            
            <GiftedChat
                listViewProps={styles.inboxContainer}
                textInputProps={styles.composer}
                maxComposerHeight={200}
                minInputToolbarHeight={60}
                renderInputToolbar={renderInput}
                messages={messages}
                onSend={messages => onSend(messages)}
                alwaysShowSend
                user={{
                    _id: 1,
                }}
                text={emoji.parse(text)}
                onInputTextChanged={onChangeTextHandle}
                parsePatterns={(linkStyle) => [
                    { type: 'phone', style: linkStyle, onPress: this.onPressPhoneNumber }
                ]}
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
    },
    inputBar: {
        borderRadius: 10,
        backgroundColor: "red",
        marginLeft: 20
    },
    footerToolbar: {
        position: "relative",
        display: "flex",
        flexDirection: "row"
    },

    composer: {
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#ddddd1',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        fontSize: 16,
        backgroundColor: "#ddddd1"
    },
    phone: {
        
    }

})