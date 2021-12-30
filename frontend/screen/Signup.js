import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { API_URL } from "../config"
import { Entypo } from "@expo/vector-icons"
import useFetch from "../hook/useFetch";
import {a} from "react-emoji-render/data/aliases";
import {fetchWithErrHandler} from "../util/fetchWithErrNotification";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {SHOW_MODAL} from "../action/types";
import apiError from "../util/errorConstant";




export default function Signup({}) {
  const [selectedRegion, setRegion] = useState("VN")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const send = useFetch()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { register, handleSubmit, control, errors, reset, watch } = useForm({
    defaultValues: {
      userLoginId: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      roles: [],
    },
  });


  const onSubmit = () => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    if(phoneNumber.length > 12 || phoneNumber < 9){
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Unknown error",
          content: "phone number length from 9 to 12",
        },
      });
      return;
    }

    let a = Number(phoneNumber);
    console.log("a", a)
    if(isNaN(a)){
      console.log("xxxxxxxxxx")
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Unknown error",
          content: "phone number require from 0 to 9",
        },
      });
      return;
    }


    if(password.length < 6){
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Unknown error",
          content: "password length require >= 6",
        },
      });
      return;
    }

    if(name.length > 100 || name.length < 20){
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Unknown error",
          content: "name length from 20 to 100",
        },
      });
      return;
    }

    var raw = JSON.stringify({
      phoneNumber: phoneNumber,
      password: password,
      name: name,
    })



    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }
    try {
      const response = fetchWithErrHandler(
          `${API_URL}/user/register`,
          requestOptions,
          3000,
          dispatch
      )
      console.log("response ", response);
      if(response.body.code === 1000){
        // successNoti("You have registered successful", true)
        navigation.goBack();
      }else{
        // errNoti(response.body.message, true);
      }

    }catch (e) {
      console.log(e);
    }
    // fetch("http://34.70.67.66:8080/api/user/register", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error", error))
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require("../assets/background-blue-pattern-geometric-style-blue-geometric-pattern-135451784.jpg")}
      ></Image>


      <View style={styles.groupInput}>
        <AntDesign name="phone" size={24} color="black" />
        <TextInput
          placeholder={"Phone number"}
          onChangeText={(input) => {
            setPhoneNumber(input)
          }}
          value={phoneNumber}
          style={styles.input}
        />
        <View>
          <Entypo
            name="cross"
            size={24}
            color="black"
            onPress={() => {
              setPhoneNumber("")
            }}
          />
        </View>
      </View>
      <View style={styles.groupInput}>
        <AntDesign name="name" size={24} color="black" />
        <TextInput
          placeholder={"Name"}
          onChangeText={(input) => {
            setName(input)
          }}
          value={name}
          style={styles.input}
        />
        <View>
          <Entypo
            name="cross"
            size={24}
            color="black"
            onPress={() => {
              setName(name)
            }}
          />
        </View>
      </View>
      <View style={styles.groupInput}>
        <AntDesign name="password" size={24} color="black" />
        <TextInput
          placeholder={"Password"}
          onChangeText={(input) => {
            setPassword(input)
          }}
          value={password}
          style={styles.input}
        />
        <View>
          <Entypo
            name="cross"
            size={24}
            color="black"
            onPress={() => {
              setPassword("")
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submit} onPress={onSubmit}>
        <View>
          <View style={styles.circle}>
            <AntDesign
              style={styles.arrow}
              name="arrowright"
              size={24}
              color="black"
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  arrow: {
    color: "white",
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: "#0099ff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  input: {
    color: "black",
    margin: 15,
    padding: 10,
    borderWidth: 0,
    borderLeftWidth: 1,
    flex: 1,
  },
  groupInput: {
    marginTop: 20,

    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10,
    width: "80%",
  },

  logo: {
    padding: 30,
  },
  submit: {
    position: "absolute",
    bottom: 50,
    right: 50,
  },
  welcome: {
    fontWeight: "700",
    textAlign: "center",
  },
  more: {
    margin: 10,
    width: "80%",
    textAlign: "center",
    alignItems: "center",
  },
  clearButton: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3,
    marginBottom: 20,
    minWidth: "100%",
  },
})
