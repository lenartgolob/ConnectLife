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
import {
  setWasherStatus,
  setWasherProgram,
  setWasherTime,
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { TimePicker } from "react-native-simple-time-picker";

import start from "../assets/images/start.png";
import intensive from "../assets/images/intensive.png";
import eco from "../assets/images/eco.png";
import normal from "../assets/images/normal.png";
import glass from "../assets/images/glass.png";
import rapid from "../assets/images/rapid.png";

const WIDTH = Dimensions.get("window").width;

const program_options = [
  { program: "Intensive", value: "AUTO" },
  { program: "ECO", value: "ECO" },
  { program: "Normal", value: "NORMAL" },
  { program: "Glass", value: "CRYSTAL_GLASS" },
  { program: "Rapid", value: "RINSE" },
];

export default function PomivalniStrojPage({ navigation }) {
  const dispatch = useDispatch();
  const [program, setProgram] = useState("");
  const [time, setTime] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [optionSelected, setOptionSelected] = useState(0);
  const [selectedTime, setSelectedTime] = useState("invalid");

  function onPickerChange(pickerObj, minute) {
    let ura = pickerObj.hours;
    let minuta = pickerObj.minutes;
    let cas = ura * 60 + minuta;
    setHour(ura);
    setMinute(minuta);
    setTime(cas);
    if (ura > 0 || minuta > 0) {
      setSelectedTime("valid");
    } else {
      setSelectedTime("invalid");
    }
  }

  function dishWasherStart() {
    if (optionSelected == 0 || selectedTime == "invalid") {
      alert("Prosimo izpolnite vsa polja!");
    } else {
      dispatch(setWasherStatus("on"));
      dispatch(setWasherProgram(program));
      let date = new Date(new Date().getTime() + time * 60000);
      dispatch(setWasherTime(JSON.stringify(date)));

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
    if (`${value}` == "intensive") {
      icon = intensive;
    } else if (`${value}` == "eco") {
      icon = eco;
    } else if (`${value}` == "normal") {
      icon = normal;
    } else if (`${value}` == "glass") {
      icon = glass;
    } else if (`${value}` == "rapid") {
      icon = rapid;
    }
    return (
      <Text style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>{`${program}`}</Text>
      </Text>
    );
  }

  function _dropdown_2_renderRow(rowData, rowID, highlighted) {
    let icon;
    if (rowID == 0) {
      icon = intensive;
    } else if (rowID == 1) {
      icon = eco;
    } else if (rowID == 2) {
      icon = normal;
    } else if (rowID == 3) {
      icon = glass;
    } else if (rowID == 4) {
      icon = rapid;
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
          defaultValue={"Izberite način pranja..."}
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
      <Text>Čas pranja:</Text>
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
            onPress={() => dishWasherStart()}
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
    marginBottom: 60,
    width: WIDTH * 0.65,
  },

  modalDropdown: {
    width: "100%",
  },

  timePickerContainer: {
    flexDirection: "row",
    marginBottom: 20,
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
    paddingHorizontal: 10,
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

const pickerStyle = {
  inputIOS: {
    fontSize: 16,
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    textAlign: "center",
    borderRadius: 4,
  },
  inputAndroid: {
    color: "black",
    textAlign: "center",
  },
};
