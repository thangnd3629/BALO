import React, { useState } from "react"
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"
export default function Signup({ navigation }) {
  const [selectedRegion, setRegion] = useState("VN")
  const [phoneNumber, setPhoneNumber] = useState("")
  const onSubmit = (data) => console.log(data)

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
      <TouchableOpacity style={styles.submit}>
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
