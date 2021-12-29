import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";

import bg from "../assets/images/home-bg2.jpg";
import pecica from "../assets/images/oven.png";
import plosca from "../assets/images/induction.png";
import hladilnik from "../assets/images/fridge.png";
import pomivalec from "../assets/images/washer.png";
import program from "../assets/images/program.png";
import timer from "../assets/images/timer.png";
import temperature from "../assets/images/temperature.png";
import hot from "../assets/images/hot.png";
import black from "../assets/images/black.png";

import { useSelector, useDispatch } from "react-redux";
import {
  setOvenStatus,
  setOvenProgram,
  setOvenTemperature,
  setOvenMinutes,
  setOvenHours,
  setOvenTime,
  setWasherStatus,
  setWasherProgram,
  setWasherTime,
  setInduction1,
  setInduction2,
  setInduction3,
  setInduction4,
  setValueInduction1,
  setValueInduction2,
  setValueInduction3,
  setValueInduction4,
} from "../redux/actions";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function HomePage({ navigation }) {
  const {
    ovenProgram,
    ovenTemperature,
    ovenStatus,
    ovenTime,
    washerStatus,
    washerProgram,
    washerTime,
    valueInduction1,
    valueInduction2,
    valueInduction3,
    valueInduction4,
  } = useSelector((state) => state.kitchenReducer);
  const dispatch = useDispatch();

  const [ovenTimeLeft, setOvenTimeLeft] = useState(calculateOvenTimeLeft());
  const [washerTimeLeft, setWasherTimeLeft] = useState(calculateWasherTimeLeft());

  function calculateOvenTimeLeft() {
    let difference;
    if (ovenTime) {
      difference =
        +new Date(JSON.parse(ovenTime)).getTime() - +new Date().getTime();
    } else {
      difference = 0;
    }
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        together: difference,
      };
    }
    return timeLeft;
  }

  function calculateWasherTimeLeft() {
    let difference;
    if (washerTime) {
      difference =
        +new Date(JSON.parse(washerTime)).getTime() - +new Date().getTime();
    } else {
      difference = 0;
    }

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        together: difference,
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const oven = calculateOvenTimeLeft();
      setOvenTimeLeft(oven);
      if (!oven.together && ovenStatus == "on") {
        dispatch(setOvenStatus("off"));
        dispatch(setOvenTemperature(0));
        dispatch(setOvenMinutes(0));
        dispatch(setOvenHours(0));
        dispatch(setOvenProgram(""));
        dispatch(setOvenTime(""));
        alert("Pečica se je ugasnila.");
      }
      const washer = calculateWasherTimeLeft();
      setWasherTimeLeft(washer);
      if (!washer.together && washerStatus == "on") {
        dispatch(setWasherStatus("off"));
        dispatch(setWasherProgram(""));
        dispatch(setWasherTime(0));
        alert("Pomivalni stroj se je ugasnil.");
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  function ovenStop() {
    dispatch(setOvenStatus("off"));
    dispatch(setOvenTemperature(0));
    dispatch(setOvenMinutes(0));
    dispatch(setOvenHours(0));
    dispatch(setOvenProgram(""));
    dispatch(setOvenTime(""));
    alert("Pečico ste uspešno ugasnali.");
  }

  function washerStop(washerStatus) {
    dispatch(setWasherStatus("off"));
    dispatch(setWasherProgram(""));
    dispatch(setWasherTime(0));
    alert("Pomivalni stroj ste uspešno ugasnali.");
  }

  function ploscaStop() {
    dispatch(setInduction1("default"));
    dispatch(setInduction2("default"));
    dispatch(setInduction3("default"));
    dispatch(setInduction4("default"));
    dispatch(setValueInduction1(0));
    dispatch(setValueInduction2(0));
    dispatch(setValueInduction3(0));
    dispatch(setValueInduction4(0));

    alert("vse plate ste uspešno ugasnali.");
  }

  function renderOvenProgram(program) {
    if (program == "HOTAIR") {
      return "Vroč zrak";
    } else if (program == "TOPBOTTOM") {
      return "Zgoraj in spodaj";
    } else if (program == "SMALLGRILL") {
      return "Grill";
    } else if (program == "TOP") {
      return "Zgornji grelnik";
    } else if (program == "BOTTOM") {
      return "Spodnji grelnik";
    }
  }

  function renderWasherProgram(program) {
    if (program == "AUTO") {
      return "Intensive";
    } else if (program == "ECO") {
      return "ECO";
    } else if (program == "NORMAL") {
      return "Normal";
    } else if (program == "CRYSTAL_GLASS") {
      return "Glass";
    } else if (program == "RINSE") {
      return "Rapid";
    }
  }

  function redirectToPecicaPage() {
    navigation.navigate("Pecica");
  }

  function redirectToKuhalnaPloscaPage() {
    navigation.navigate("KuhalnaPlosca");
  }

  function redirectToHladilnikPage() {
    navigation.navigate("Hladilnik");
  }

  function redirectToPomivalniStrojPage() {
    navigation.navigate("PomivalniStroj");
  }

  return (
    <View>
      <ScrollView
        style={[styles.scrollview]}
        disableScrollViewPanResponder={true}
      >
        <Text style={styles.header}>Kuhinja</Text>
        <Text style={styles.header2}>Aparati</Text>
        <View style={styles.row1}>
          <TouchableOpacity
            disabled={ovenStatus == "on" ? true : false}
            style={ovenStatus == "on" ? styles.pecicaOn : styles.pecica}
            onPress={() => {
              redirectToPecicaPage();
            }}
          >
            <Image source={pecica} style={styles.pecicaIcon} />

            <Text style={styles.aparatText}>Pečica</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              redirectToKuhalnaPloscaPage();
            }}
            style={styles.kuhalnaPlosca}
          >
            <Image source={plosca} style={styles.ploscaIcon} />

            <Text style={styles.aparatText}>Kuhalna plošča</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row2}>
          <TouchableOpacity
            onPress={() => {
              redirectToHladilnikPage();
            }}
            style={styles.hladilnik}
          >
            <Image source={hladilnik} style={styles.hladilnikIcon} />

            <Text style={styles.aparatText}>Hladilnik</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={washerStatus == "on" ? true : false}
            onPress={() => {
              redirectToPomivalniStrojPage();
            }}
            style={
              washerStatus == "on"
                ? styles.pomivalniStrojOn
                : styles.pomivalniStroj
            }
          >
            <Image source={pomivalec} style={styles.pomivalecIcon} />

            <Text style={styles.aparatText}>Pomivalni stroj</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.onContainer}>
          <View
            style={[
              styles.elementOn,
              ovenStatus == "on" ? {} : { display: "none" },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: 37 }}>
                <Image source={pecica} style={styles.pecicaIcon} />
              </View>
              <View>
                <Text style={{ fontSize: 17 }}>Pečica - v teku</Text>
              </View>
              <View style={{ width: 37 }}></View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <View style={styles.ovenRows}>
                  <Image source={program} style={styles.image} />
                  <Text style={{ paddingLeft: 5, fontSize: 14 }}>
                    {renderOvenProgram(ovenProgram)}
                  </Text>
                </View>
                <View style={styles.ovenRows}>
                  <Image source={temperature} style={styles.image} />
                  <Text style={{ paddingLeft: 5, fontSize: 14 }}>
                    {ovenTemperature} °C
                  </Text>
                </View>
                <View style={styles.ovenRows}>
                  <Image source={timer} style={styles.image} />
                  <Text style={{ paddingLeft: 5, fontSize: 14 }}>
                    {ovenTimeLeft.hours > 0
                      ? ("0" + ovenTimeLeft.hours).slice(-2) + ":"
                      : ""}
                    {ovenTimeLeft.minutes > 0
                      ? ("0" + ovenTimeLeft.minutes).slice(-2) + ":"
                      : ""}
                    {ovenTimeLeft.seconds}
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.stopButton}
                    onPress={() => ovenStop()}
                  >
                    <Text style={{ fontSize: 15 }}>Stop</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.elementOn,
              valueInduction1 > 0 ||
              valueInduction2 > 0 ||
              valueInduction3 > 0 ||
              valueInduction4 > 0
                ? {}
                : { display: "none" },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: 37 }}>
                <Image source={plosca} style={styles.pecicaIcon} />
              </View>
              <View>
                <Text style={{ fontSize: 17 }}>Kuhalna plosca - v teku</Text>
              </View>
              <View style={{ width: 37 }}></View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <View style={styles.inductionContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginBottom: 3,
                    }}
                  >
                    <ImageBackground
                      source={valueInduction1 > 0 ? hot : black}
                      style={
                        valueInduction1 > 0
                          ? styles.inductionHot1
                          : styles.induction1
                      }
                    />
                    <ImageBackground
                      source={valueInduction2 > 0 ? hot : black}
                      style={
                        valueInduction2 > 0
                          ? styles.inductionHot2
                          : styles.induction2
                      }
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 3,
                    }}
                  >
                    <ImageBackground
                      source={valueInduction3 > 0 ? hot : black}
                      style={
                        valueInduction3 > 0
                          ? styles.inductionHot1
                          : styles.induction1
                      }
                    />
                    <ImageBackground
                      source={valueInduction4 > 0 ? hot : black}
                      style={
                        valueInduction4 > 0
                          ? styles.inductionHot2
                          : styles.induction2
                      }
                    />
                  </View>
                </View>
              </View>
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.stopButton}
                    onPress={() => ploscaStop()}
                  >
                    <Text style={{ fontSize: 15 }}>Stop</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.elementOn,
              washerStatus == "on" ? {} : { display: "none" },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 4,
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: 37 }}>
                <Image source={pomivalec} style={styles.pecicaIcon} />
              </View>
              <View>
                <Text style={{ fontSize: 17 }}>Pomivalni stroj - v teku</Text>
              </View>
              <View style={{ width: 37 }}></View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ paddingTop: 8 }}>
                <View style={styles.washerRows}>
                  <Image source={program} style={styles.image} />
                  <Text style={{ paddingLeft: 5, fontSize: 14 }}>
                    {renderWasherProgram(washerProgram)}
                  </Text>
                </View>
                <View style={styles.washerRows}>
                  <Image source={timer} style={styles.image} />
                  <Text style={{ paddingLeft: 5, fontSize: 14 }}>
                    {washerTimeLeft.hours > 0
                      ? ("0" + washerTimeLeft.hours).slice(-2) + ":"
                      : ""}
                    {washerTimeLeft.minutes > 0
                      ? ("0" + washerTimeLeft.minutes).slice(-2) + ":"
                      : ""}
                    {washerTimeLeft.seconds}
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.stopButton}
                    onPress={() => washerStop()}
                  >
                    <Text style={{ fontSize: 15 }}>Stop</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <ImageBackground
        style={[styles.fixed, styles.containterImageBg, { zIndex: -1 }]}
        source={bg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#F0F0F0",
    flex: 1,
  },

  header: {
    marginTop: 75,
    marginLeft: WIDTH * 0.11,
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },

  header2: {
    marginTop: 30,
    marginLeft: WIDTH * 0.12,
    color: "white",
    fontWeight: "bold",
  },

  row1: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  row2: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  pecica: {
    backgroundColor: "white",
    width: WIDTH * 0.34,
    height: WIDTH * 0.28,
    borderRadius: 10,
    marginRight: WIDTH * 0.04,
  },

  pecicaOn: {
    backgroundColor: "#DCDCDC",
    width: WIDTH * 0.34,
    height: WIDTH * 0.28,
    borderRadius: 10,
    marginRight: WIDTH * 0.04,
  },

  pecicaIcon: {
    marginTop: 8,
    marginLeft: 5,
    width: 32,
    height: 32,
  },

  kuhalnaPlosca: {
    backgroundColor: "white",
    width: WIDTH * 0.34,
    height: WIDTH * 0.28,
    borderRadius: 10,
    marginLeft: WIDTH * 0.04,
  },

  ploscaIcon: {
    marginTop: 5,
    marginLeft: 7,
    width: 38,
    height: 38,
  },

  hladilnik: {
    backgroundColor: "white",
    width: WIDTH * 0.34,
    height: WIDTH * 0.28,
    borderRadius: 10,
    marginRight: WIDTH * 0.04,
  },

  hladilnikIcon: {
    marginTop: 7,
    width: 39,
    height: 39,
  },

  pomivalniStroj: {
    backgroundColor: "white",
    width: WIDTH * 0.34,
    height: WIDTH * 0.28,
    borderRadius: 10,
    marginLeft: WIDTH * 0.04,
  },

  pomivalniStrojOn: {
    backgroundColor: "#DCDCDC",
    width: WIDTH * 0.34,
    height: WIDTH * 0.28,
    borderRadius: 10,
    marginLeft: WIDTH * 0.04,
  },

  pomivalecIcon: {
    marginTop: 5,
    marginLeft: 7,
    width: 36,
    height: 36,
  },

  aparatText: {
    fontSize: 12,
    marginTop: "auto",
    marginBottom: 5,
    marginLeft: 5,
  },

  onContainer: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
  },

  elementOn: {
    backgroundColor: "white",
    width: WIDTH * 0.76,
    height: HEIGHT * 0.22,
    borderRadius: 10,
    marginTop: 25,
  },

  image: {
    width: 22,
    height: 22,
    marginRight: 4,
  },

  ovenRows: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingLeft: 7,
  },

  washerRows: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingLeft: 7,
  },

  stopButton: {
    borderWidth: 1.2,
    borderRadius: 3,
    borderColor: "black",
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginRight: 40,
    marginTop: WIDTH * 0.06,
  },

  scrollview: {
    backgroundColor: "transparent",
  },

  containterImageBg: {
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  inductionContainer: {
    backgroundColor: "black",
    width: HEIGHT * 0.13,
    height: HEIGHT * 0.13,
    borderRadius: 4,
    marginLeft: 20,
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  induction: {
    width: HEIGHT * 0.045,
    height: HEIGHT * 0.045,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 100 / 2,
  },

  inductionHot: {
    width: HEIGHT * 0.045,
    height: HEIGHT * 0.045,
    borderRadius: 100 / 2,
  },

  induction1: {
    width: HEIGHT * 0.045,
    height: HEIGHT * 0.045,
    borderRadius: 100 / 2,
    marginRight: 3,
    borderWidth: 1,
    borderColor: "white",
  },

  induction2: {
    width: HEIGHT * 0.045,
    height: HEIGHT * 0.045,
    borderRadius: 100 / 2,
    marginLeft: 3,
    borderWidth: 1,
    borderColor: "white",
  },

  inductionHot1: {
    width: HEIGHT * 0.045,
    height: HEIGHT * 0.045,
    borderRadius: 100 / 2,
    marginRight: 3,
  },

  inductionHot2: {
    width: HEIGHT * 0.045,
    height: HEIGHT * 0.045,
    borderRadius: 100 / 2,
    marginLeft: 3,
  },
});
