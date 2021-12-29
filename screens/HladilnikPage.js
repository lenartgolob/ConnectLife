import React from "react";
import {
  View,
  Picker,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import start from "../assets/images/start.png";
import { setCoolerTemp } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const HEIGHT = Dimensions.get("window").height;

export default function HladilnikPage({ navigation }) {
  const { coolerTemp } = useSelector((state) => state.kitchenReducer);
  const dispatch = useDispatch();

  function coolerStart() {
    alert(
      "Uspešno ste spremenili temperaturo hladilnika na " + coolerTemp + "°C"
    );
    navigation.navigate("Home");
  }
  return (
    <View style={[styles.container, { flex: 1, alignItems: "center" }]}>
      <View
        style={
          Platform.OS === "ios"
            ? { marginTop: HEIGHT * 0.15 }
            : { marginTop: HEIGHT * 0.3 }
        }
      >
        <Picker
          selectedValue={coolerTemp}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue) => dispatch(setCoolerTemp(itemValue))}
        >
          <Picker.Item label="3°C" value={3} />
          <Picker.Item label="4°C" value={4} />
          <Picker.Item label="5°C" value={5} />
          <Picker.Item label="6°C" value={6} />
          <Picker.Item label="7°C" value={7} />
          <Picker.Item label="8°C" value={8} />
        </Picker>
      </View>
      <View style={Platform.OS === "ios" ? { marginTop: HEIGHT * 0.25 } : {}}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => coolerStart()}
        >
          <Image style={{ width: 50, height: 50 }} source={start} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },

  startButton: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "black",
    paddingHorizontal: 13,
  },
});
