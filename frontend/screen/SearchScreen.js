import React, {useEffect, useState} from "react"
import { StyleSheet, Text, View, useWindowDimensions } from "react-native"
import {useDispatch, useSelector} from "react-redux"
import { TabView, SceneMap } from "react-native-tab-view"
import UserContactCard from "../components/UserContactCard"
import {fetchWithErrHandler} from "../util/fetchWithErrNotification";
import {API_URL} from "../config";







export default function SearchScreen() {

    const dispatch = useDispatch();

    const [friend, setFriend] = useState([]);
    const FriendRoute = () => (

        <View style={{ flex: 1 }}>
            {/*<UserContactCard />*/}
            {/*<UserContactCard />*/}
            {/*<UserContactCard />*/}
            {/*<UserContactCard />*/}
            {/*<UserContactCard />*/}
            {/*<UserContactCard />*/}
            {
                friend.map(f => {
                    return(
                        <UserContactCard
                            userName={f.name}
                        />
                    );
                })
            }
        </View>
    ) ;



    const MsgRoute = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />

    const renderScene = SceneMap({
        first: FriendRoute,
        second: MsgRoute,
    })

    const layout = useWindowDimensions()

    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: "first", title: "Bạn bè" },
        { key: "second", title: "Tin nhắn" },
    ])

    const { query } = useSelector((state) => state.globalQueryReducer)
    const auth = useSelector((state) => state.authReducer)


    const getFriend = async () => {
        console.log("get friend");
        let myHeaders = new Headers();
        myHeaders.append("X-Auth-Token", `${auth.token}`)
        myHeaders.append("Content-Type", "application/json")
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            // redirect: "follow",
        }
        const response = await fetchWithErrHandler(
            `${API_URL}/get-friend`,
            requestOptions,
            10000,
            dispatch
        );
        console.log("response {}", response.body);
        setFriend(response.body);
    }

    useEffect(() => {
        getFriend();
    }, [])


    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}

const styles = StyleSheet.create({})
