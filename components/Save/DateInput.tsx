import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Colors from "../../constants/Colors";
import { localeString, Text, View } from "../Themed";
import Strings from "../../constants/Strings";
import { formatDate } from "../../app/helpers";

export default ({
  titleRes,
  date,
  setDate,
}: {
  titleRes: keyof typeof Strings.de;
  date: Date;
  setDate: (date: Date) => void;
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);

  return (
    <View>
      <Text style={styles.header}>{localeString(titleRes)}</Text>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setDatePickerVisibility(true)}
      >
        <FontAwesome name={"calendar"} size={20} style={styles.icon} />
        <Text>{formatDate(date)}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={(newDate: Date) => {
          setDatePickerVisibility(false);
          setDate(newDate);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 48,
      marginTop: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      backgroundColor: col.buttonSecondary,
    },
    header: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
    },
    icon: {
      position: "absolute",
      left: 16,
      color: col.textLight,
    },
  });
