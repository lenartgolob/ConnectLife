import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { Slider } from "react-native-elements";
import {
  setOvenStatus,
  setOvenProgram,
  setOvenTemperature,
  setOvenMinutes,
  setOvenHours,
  setOvenTime,
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { TimePicker } from "react-native-simple-time-picker";

import start from "../assets/images/start.png";
import hot_air from "../assets/images/hot_air.png";
import top_bottom_heat from "../assets/images/top_bottom_heat.png";
import grill from "../assets/images/grill.png";
import top_heat from "../assets/images/top_heat.png";
import bottom_heat from "../assets/images/bottom_heat.png";

const WIDTH = Dimensions.get("window").width;

const program_options = [
  { program: "Vroč zrak", value: "HOTAIR" },
  { program: "Zgornji in spodnji grelnik", value: "TOPBOTTOM" },
  { program: "Grill", value: "SMALLGRILL" },
  { program: "Zgornji grelnik", value: "TOP" },
  { program: "Spodnji grelnik", value: "BOTTOM" },
];

export default function PecicaPage({ navigation }) {
  const dispatch = useDispatch();

  const [program, setProgram] = useState("");
  const [temp, setTemp] = useState(30);
  const [time, setTime] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [optionSelected, setOptionSelected] = useState(0);
  const [selectedTime, setSelectedTime] = useState("invalid");
  const [minuteShow, setMinuteShow] = useState("");

  function onPickerChange(pickerObj, minute) {
    let ura = pickerObj.hours;
    let minuta = pickerObj.minutes;
    let cas = ura * 60 + minuta;
    setHour(ura);
    setMinute(minuta);
    setTime(cas);
    setMinuteShow(minuta);
    if (ura > 0 || minuta > 0) {
      setSelectedTime("valid");
    } else {
      setSelectedTime("invalid");
    }
  }

  function ovenStart() {
    if (optionSelected == 0 || selectedTime == "invalid") {
      alert("Prosimo izpolnite vsa polja!");
    } else {
      dispatch(setOvenStatus("on"));
      dispatch(setOvenTemperature(temp));
      dispatch(setOvenMinutes(minuteShow));
      dispatch(setOvenHours(hour));
      dispatch(setOvenProgram(program));
      let date = new Date(new Date().getTime() + time * 60000);
      dispatch(setOvenTime(JSON.stringify(date)));
      navigation.navigate("Home");
    }
  }

  function _dropdown_2_onSelect(idx, value) {
    setProgram(value["value"]);
    setOptionSelected(optionSelected + 1);
  }

  function _dropdown_2_renderButtonText(rowData) {
    let icon;
    const { program, value } = rowData;
    if (`${value}` == "HOTAIR") {
      icon = hot_air;
    } else if (`${value}` == "TOPBOTTOM") {
      icon = top_bottom_heat;
    } else if (`${value}` == "SMALLGRILL") {
      icon = grill;
    } else if (`${value}` == "TOP") {
      icon = top_heat;
    } else if (`${value}` == "BOTTOM") {
      icon = bottom_heat;
    }

    return (
      <Text style={{ textAlign: "center" }}>
        <Text>{`${program}`}</Text>
      </Text>
    );
  }

  function _dropdown_2_renderRow(rowData, rowID, highlighted) {
    let icon;
    if (rowID == 0) {
      icon = hot_air;
    } else if (rowID == 1) {
      icon = top_bottom_heat;
    } else if (rowID == 2) {
      icon = grill;
    } else if (rowID == 3) {
      icon = top_heat;
    } else if (rowID == 4) {
      icon = bottom_heat;
    }

    return (
      <View style={styles.dropdown_2_row}>
        <Image style={styles.dropdown_2_image} mode="stretch" source={icon} />
        <Text style={styles.dropdown_2_row_text}>{`${rowData.program}`}</Text>
      </View>
    );
  }

  function _dropdown_2_renderSeparator(
    sectionID,
    rowID,
    adjacentRowHighlighted
  ) {
    let key = `spr_${rowID}`;
    return <View style={styles.dropdown_2_separator} key={key} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalDropdownContainer}>
        <ModalDropdown
          options={program_options}
          style={styles.dropdown_2}
          textStyle={styles.dropdown_2_text}
          dropdownStyle={styles.dropdown_2_dropdown}
          defaultValue={"Izberite način gretja..."}
          onSelect={(idx, value) => _dropdown_2_onSelect(idx, value)}
          renderButtonText={(rowData) => _dropdown_2_renderButtonText(rowData)}
          renderRow={_dropdown_2_renderRow.bind(this)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
            _dropdown_2_renderSeparator(
              sectionID,
              rowID,
              adjacentRowHighlighted
            )
          }
        />
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          value={temp}
          onValueChange={(t) => setTemp(t)}
          maximumValue={275}
          minimumValue={30}
          animateTransitions={true}
          step={5}
          style={styles.slider}
          thumbTintColor={"#047CF9"}
        />
        <Text style={{ textAlign: "center" }}>Temperatura: {temp} °C</Text>
      </View>
      <Text>Čas gretja:</Text>
      <View style={styles.timePickerContainer}>
        <TimePicker
          selectedHours={hour}
          selectedMinutes={minute}
          hoursUnit=" h"
          minutesUnit=" min"
          onChange={(hours, minutes) => {
            onPickerChange(hours, minutes);
          }}
        />
      </View>

      <View style={styles.startStop}>
        <View style={styles.start}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => ovenStart()}
          >
            <Image style={{ width: 50, height: 50 }} source={start} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  modalDropdownContainer: {
    marginBottom: 40,
    width: WIDTH * 0.65,
  },

  modalDropdown: {
    width: "100%",
  },

  sliderContainer: {
    marginBottom: 40,
    width: WIDTH * 0.65,
  },

  timePickerContainer: {
    flexDirection: "row",
    width: WIDTH * 0.65,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  timePickerText: {
    width: WIDTH * 0.2,
  },

  timePickerButton: {
    width: WIDTH * 0.2,
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 3,
    borderColor: "black",
    borderWidth: 1,
  },

  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },

  startStop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: WIDTH * 0.65,
  },

  startButton: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "black",
    paddingHorizontal: 13,
  },

  stopButton: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "black",
    paddingHorizontal: 13,
  },

  dropdown_2: {
    width: "100%",
    borderBottomWidth: 1,
    borderRadius: 3,
  },

  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 16,
    color: "black",
    textAlignVertical: "center",
    textAlign: "center",
  },

  dropdown_2_dropdown: {
    width: WIDTH * 0.65,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
  },

  dropdown_2_row: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },

  dropdown_2_image: {
    marginLeft: 4,
    width: 30,
    height: 30,
  },

  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: "black",
    textAlignVertical: "center",
  },

  dropdown_2_separator: {
    height: 1,
    backgroundColor: "gray",
  },

  image: {
    width: 12,
    height: 12,
    marginRight: 10,
  },
});
