import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

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
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);

  return (
    <View>
      <Text style={styles.header}>{localeString(titleRes)}</Text>
      <View style={styles.container}>
        <FontAwesome name={"calendar"} size={20} style={styles.icon} />
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event: DateTimePickerEvent, date?: Date) => {
            if (date) setDate(date);
          }}
        />
      </View>
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
