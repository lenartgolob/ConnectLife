import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import InputSpinner from "react-native-input-spinner";
import {
  setInduction1,
  setInduction2,
  setInduction3,
  setInduction4,
  setValueInduction1,
  setValueInduction2,
  setValueInduction3,
  setValueInduction4,
} from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import hot from "../assets/images/hot.png";

const WIDTH = Dimensions.get("window").width;

export default function KuhalnaPloscaPage({ navigation }) {
  const { valueInduction1, valueInduction2, valueInduction3, valueInduction4 } =
    useSelector((state) => state.kitchenReducer);
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [bgColor1, setBgColor1] = useState("black");
  const [bgColor2, setBgColor2] = useState("black");
  const [bgColor3, setBgColor3] = useState("black");
  const [bgColor4, setBgColor4] = useState("black");
  const [clickedInduction1, setClickedInduction1] = useState(0);
  const [clickedInduction2, setClickedInduction2] = useState(0);
  const [clickedInduction3, setClickedInduction3] = useState(0);
  const [clickedInduction4, setClickedInduction4] = useState(0);
  const [inductionBorderWidth1, setInductionBorderWidth1] = useState(2);
  const [inductionBorderColor1, setInductionBorderColor1] = useState("white");
  const [inductionBorderWidth2, setInductionBorderWidth2] = useState(2);
  const [inductionBorderColor2, setInductionBorderColor2] = useState("white");
  const [inductionBorderWidth3, setInductionBorderWidth3] = useState(2);
  const [inductionBorderColor3, setInductionBorderColor3] = useState("white");
  const [inductionBorderWidth4, setInductionBorderWidth4] = useState(2);
  const [inductionBorderColor4, setInductionBorderColor4] = useState("white");
  const [selected, setSelected] = useState("");

  function onPressInduction1() {
    if (clickedInduction1 == 1) {
      setBgColor1("black");
      setClickedInduction1(0);
      setSelected("");
    } else {
      if (clickedInduction1 == 0) {
        setBgColor1("#C8C8C8");
        setBgColor2("black");
        setBgColor3("black");
        setBgColor4("black");
        setSelected("Induction1");
        setClickedInduction1(1);
        setClickedInduction2(0);
        setClickedInduction3(0);
        setClickedInduction4(0);
        setValue(valueInduction1);
      }
    }
  }

  function onPressInduction2() {
    if (clickedInduction2 == 1) {
      setBgColor2("black");
      setClickedInduction2(0);
      setSelected("");
    } else {
      if (clickedInduction2 == 0) {
        setBgColor1("black");
        setBgColor2("#C8C8C8");
        setBgColor3("black");
        setBgColor4("black");
        setSelected("Induction2");
        setClickedInduction1(0);
        setClickedInduction2(1);
        setClickedInduction3(0);
        setClickedInduction4(0);
        setValue(valueInduction2);
      }
    }
  }

  function onPressInduction3() {
    if (clickedInduction3 == 1) {
      setBgColor3("black");
      setClickedInduction3(0);
      setSelected("");
    } else {
      if (clickedInduction3 == 0) {
        setBgColor1("black");
        setBgColor2("black");
        setBgColor3("#C8C8C8");
        setBgColor4("black");
        setSelected("Induction3");
        setClickedInduction1(0);
        setClickedInduction2(0);
        setClickedInduction3(1);
        setClickedInduction4(0);
        setValue(valueInduction3);
      }
    }
  }

  function onPressInduction4() {
    if (clickedInduction4 == 1) {
      setBgColor4("black");
      setClickedInduction4(0);
      setSelected("");
    } else {
      if (clickedInduction4 == 0) {
        setBgColor1("black");
        setBgColor2("black");
        setBgColor3("black");
        setBgColor4("#C8C8C8");
        setSelected("Induction4");
        setClickedInduction1(0);
        setClickedInduction2(0);
        setClickedInduction3(0);
        setClickedInduction4(1);
        setValue(valueInduction4);
      }
    }
  }

  function onChange1(value) {
    if (selected == "Induction1") {
      dispatch(setValueInduction1(value));
      if (value > 0) {
        setInductionBorderWidth1(null);
        setInductionBorderColor1(null);
      } else {
        setBgColor1("#C8C8C8");
        setInductionBorderWidth1(2);
        setInductionBorderColor1("white");
      }
    }

    if (value > 0) {
      dispatch(setInduction1("on"));
    } else {
      dispatch(setInduction1("off"));
    }
  }

  function onChange2(value) {
    if (selected == "Induction2") {
      dispatch(setValueInduction2(value));
      if (value > 0) {
        setInductionBorderWidth2(null);
        setInductionBorderColor2(null);
      } else {
        setBgColor2("#C8C8C8");
        setInductionBorderWidth2(2);
        setInductionBorderColor2("white");
      }
    }

    if (value > 0) {
      dispatch(setInduction2("on"));
    } else {
      dispatch(setInduction2("off"));
    }
  }

  function onChange3(value) {
    if (selected == "Induction3") {
      dispatch(setValueInduction3(value));

      if (value > 0) {
        setInductionBorderWidth3(null);
        setInductionBorderColor3(null);
      } else {
        setBgColor3("#C8C8C8");
        setInductionBorderWidth3(2);
        setInductionBorderColor3("white");
      }
    }

    if (value > 0) {
      dispatch(setInduction3("on"));
    } else {
      dispatch(setInduction3("off"));
    }
  }

  function onChange4(value) {
    if (selected == "Induction4") {
      dispatch(setValueInduction4(value));
      if (value > 0) {
        setInductionBorderWidth4(null);
        setInductionBorderColor4(null);
      } else {
        setBgColor4("#C8C8C8");
        setInductionBorderWidth4(2);
        setInductionBorderColor4("white");
      }
    }

    if (value > 0) {
      dispatch(setInduction4("on"));
    } else {
      dispatch(setInduction4("off"));
    }
  }

  function displayBackgroundImage1() {
    if (valueInduction1 > 0)
      return (
        <View>
          <ImageBackground
            source={hot}
            style={{
              width: WIDTH * 0.25,
              height: WIDTH * 0.25,
              borderRadius: 100 / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              {valueInduction1}
            </Text>
          </ImageBackground>
        </View>
      );
    return null;
  }

  function displayBackgroundImage2() {
    if (valueInduction2 > 0)
      return (
        <View>
          <ImageBackground
            source={hot}
            style={{
              width: WIDTH * 0.25,
              height: WIDTH * 0.25,
              borderRadius: 100 / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              {valueInduction2}
            </Text>
          </ImageBackground>
        </View>
      );
    return null;
  }

  function displayBackgroundImage3() {
    if (valueInduction3 > 0)
      return (
        <View>
          <ImageBackground
            source={hot}
            style={{
              width: WIDTH * 0.25,
              height: WIDTH * 0.25,
              borderRadius: 100 / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              {valueInduction3}
            </Text>
          </ImageBackground>
        </View>
      );
    return null;
  }

  function displayBackgroundImage4() {
    if (valueInduction4 > 0)
      return (
        <View>
          <ImageBackground
            source={hot}
            style={{
              width: WIDTH * 0.25,
              height: WIDTH * 0.25,
              borderRadius: 100 / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              {valueInduction4}
            </Text>
          </ImageBackground>
        </View>
      );
    return null;
  }
  return (
    <View style={[styles.container, { flex: 1, alignItems: "center" }]}>
      <View style={[styles.inductionContainer, { marginTop: WIDTH * 0.25 }]}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={[
              styles.induction1,
              {
                backgroundColor: bgColor1,
                borderWidth: inductionBorderWidth1,
                borderColor: inductionBorderColor1,
              },
            ]}
            onPress={() => onPressInduction1()}
          >
            {displayBackgroundImage1()}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.induction2,
              {
                backgroundColor: bgColor2,
                borderWidth: inductionBorderWidth2,
                borderColor: inductionBorderColor2,
              },
            ]}
            onPress={() => onPressInduction2()}
          >
            {displayBackgroundImage2()}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={[
              styles.induction3,
              {
                backgroundColor: bgColor3,
                borderWidth: inductionBorderWidth3,
                borderColor: inductionBorderColor3,
              },
            ]}
            onPress={() => onPressInduction3()}
          >
            {displayBackgroundImage3()}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.induction4,
              {
                backgroundColor: bgColor4,
                borderWidth: inductionBorderWidth4,
                borderColor: inductionBorderColor4,
              },
            ]}
            onPress={() => onPressInduction4()}
          >
            {displayBackgroundImage4()}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.num}>
            <InputSpinner
              max={9}
              min={0}
              value={value}
              onChange={(value) => onChange1(value)}
              rounded={false}
              showBorder={true}
              background={"#C8C8C8"}
              width={120}
              height={40}
              style={selected == "Induction1" ? {} : { display: "none" }}
            />
            <InputSpinner
              max={9}
              min={0}
              value={value}
              onChange={(value) => onChange2(value)}
              rounded={false}
              showBorder={true}
              background={"#C8C8C8"}
              width={120}
              height={40}
              style={selected == "Induction2" ? {} : { display: "none" }}
            />
            <InputSpinner
              max={9}
              min={0}
              value={value}
              onChange={(value) => onChange3(value)}
              rounded={false}
              showBorder={true}
              background={"#C8C8C8"}
              width={120}
              height={40}
              style={selected == "Induction3" ? {} : { display: "none" }}
            />
            <InputSpinner
              max={9}
              min={0}
              value={value}
              onChange={(value) => onChange4(value)}
              rounded={false}
              showBorder={true}
              background={"#C8C8C8"}
              width={120}
              height={40}
              style={selected == "Induction4" ? {} : { display: "none" }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },

  ventilationContainer: {
    width: WIDTH * 0.5,
  },

  ventilation: {
    width: "100%",
    height: 150,
  },

  inductionContainer: {
    backgroundColor: "black",
    width: WIDTH * 0.8,
    height: WIDTH * 0.8,
    borderRadius: 4,
  },

  induction1: {
    width: WIDTH * 0.25,
    height: WIDTH * 0.25,
    marginRight: WIDTH * 0.05,
    borderRadius: 100 / 2,
    marginBottom: WIDTH * 0.03,
    marginTop: WIDTH * 0.07,
    alignItems: "center",
    justifyContent: "center",
  },

  induction2: {
    width: WIDTH * 0.25,
    height: WIDTH * 0.25,
    borderColor: "white",
    borderWidth: 2,
    marginLeft: WIDTH * 0.05,
    borderRadius: 100 / 2,
    marginBottom: WIDTH * 0.03,
    marginTop: WIDTH * 0.07,
    alignItems: "center",
    justifyContent: "center",
  },

  induction3: {
    width: WIDTH * 0.25,
    height: WIDTH * 0.25,
    borderColor: "white",
    borderWidth: 2,
    marginRight: WIDTH * 0.05,
    borderRadius: 100 / 2,
    marginTop: WIDTH * 0.03,
    alignItems: "center",
    justifyContent: "center",
  },

  induction4: {
    width: WIDTH * 0.25,
    height: WIDTH * 0.25,
    borderColor: "white",
    borderWidth: 2,
    marginLeft: WIDTH * 0.05,
    borderRadius: 100 / 2,
    marginTop: WIDTH * 0.03,
    alignItems: "center",
    justifyContent: "center",
  },

  num: {
    marginTop: 12,
  },

  startButton: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "black",
    paddingHorizontal: 13,
    marginTop: 20,
  },
});
