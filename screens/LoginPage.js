import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import logo from "../assets/images/logo.png";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      accesToken: "",
      clpToken: "",
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ImageBackground style={styles.bgContainer}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Username"}
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
              underlineColorAndroid={"transparent"}
              onChangeText={this.getUsername}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Password"}
              secureTextEntry={true}
              placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
              underlineColorAndroid={"transparent"}
              onChangeText={this.getPassword}
            />
          </View>

          <TouchableOpacity onPress={this.loginCheck} style={styles.btnLogin}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }

  getUsername = (username) => {
    this.setState({ username });
  };

  getPassword = (password) => {
    this.setState({ password });
  };

  loginCheck = () => {
    if (
      this.state.username == "connectlife@newmail.top" &&
      this.state.password == "geslo123"
    ) {
      this.props.navigation.navigate("Home");
    } else {
      alert("Wrong username or password");
    }
  };
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    alignItems: "center",
  },

  logoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 30,
    opacity: 0.5,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.18,
  },

  logo: {
    width: 250,
    height: 110,
  },

  inputContainer: {
    marginTop: 10,
    width: width - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    marginHorizontal: 25,
  },

  input: {
    height: "100%",
    width: "100%",
    fontSize: 16,
    paddingLeft: 45,
    color: "rgba(255, 255, 255, 0.7)",
  },

  btnLogin: {
    width: width - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 20,
  },

  text: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginPage;
