import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { CANCEL_GLOBAL_QUERY, PERFORM_GLOBAL_QUERY } from "../action/types"

import { useNavigation } from "@react-navigation/native"
import {fetchWithErrHandler} from "../util/fetchWithErrNotification";
import {API_URL} from "../config";

export default function HeaderWithSearchBar({props}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const cancelQuery = () => {
    dispatch({
      type: CANCEL_GLOBAL_QUERY,
    })
    navigation.goBack()
  }
  const { query, isQuerying } = useSelector((state) => {
    return state.globalQueryReducer
  })
  const auth = useSelector((state) => state.authReducer)
  // const getFriend = async () => {
  //   console.log("get friend");
  //   let myHeaders = new Headers();
  //   myHeaders.append("X-Auth-Token", `${auth.token}`);
  //   myHeaders.append("Content-Type", "application/json");
  //   let requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //
  //     // redirect: "follow",
  //   }
  //   const response = await fetchWithErrHandler(
  //       `${API_URL}/get-friend`,
  //       requestOptions,
  //       10000,
  //       dispatch
  //   );
  //   console.log("response {}", response.body);
  // }

  const onChangeText = (text) => {
    dispatch({

      type: PERFORM_GLOBAL_QUERY,
      payload: text,
    })
    // getFriend();
  }
  const onPressSearchBar = () => {
    console.log("object")
    if (!isQuerying) navigation.navigate("DirectoryStack",{screen:"SearchNested"})
  }

  const search = () => {
    console.log("11111111");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchIcon}>
        {!isQuerying ? (
          <AntDesign name="search1" size={24} color="black" />
        ) : (
          <TouchableOpacity onPress={cancelQuery}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.searchBar}>
        <TextInput
          onTouchStart={onPressSearchBar}
          value={query}
          placeholder="T??m ki???m b???n b?? , tin nh???n"
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.qrIcon}>
        <AntDesign name="qrcode" size={24} color="black" />
      </View>
      <TouchableOpacity onPress={search}>
        <AntDesign name="arrowright" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10
  },

  searchIcon: {
    padding: 5,
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginLeft: 10,
    marginRight: 10,
  },
  qrIcon: {
    padding: 5,
  },
})
