import React from "react"
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require("../assets/background-blue-pattern-geometric-style-blue-geometric-pattern-135451784.jpg")}
      ></Image>
      <View style={styles.logo}>
        <Image
          source={require("../assets/zalo-1-logo-png-transparent.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <Text style={styles.welcome}>
        {"Đăng nhập tài khoản Zalo \n để kết nối với ứng dụng Zalo Chat"}
      </Text>

      <View style={styles.form}>
        <View style={styles.groupInput}>
          <AntDesign name="phone" size={24} color="black" />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder="Số điện thoại"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstName"
            defaultValue=""
          />
          {errors.firstName && <Text>This is required.</Text>}
        </View>

        <View style={styles.groupInput}>
          <AntDesign name="lock" size={24} color="black" />
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastName"
            defaultValue=""
          />
        </View>
        <TouchableOpacity style={styles.submit}>
          <Button
            title="Đăng nhập với mật khẩu"
            onPress={handleSubmit(onSubmit)}
          />
        </TouchableOpacity>
        <View style={styles.more}>
          <TouchableOpacity>
            <Pressable
              style={styles.clearButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={{ color: "lightblue", padding: 10 }}>
                Gửi yêu cầu đăng nhập
              </Text>
            </Pressable>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <Text>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  form: {
    backgroundColor: "white",
    width: "40%",
    padding: 20,
    margin: 20,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
    alignItems: "center",
  },
  input: {
    margin: 15,
    height: 40,
    width: "100%",
    padding: 20,
    borderWidth: 0,
  },
  groupInput: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10,
  },

  logo: {
    padding: 30,
  },
  submit: {
    width: "50%",
    borderRadius: 100,
    borderColor: "green",
  },
  welcome: {
    fontWeight: "700",
  },
  more: {
    margin: 10,
    width: "50%",
    padding: 20,
  },
  clearButton: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3,
    width: "100%",
    marginBottom: 20,
  },
})
