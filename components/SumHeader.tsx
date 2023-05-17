import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { formatCurrency, formatDate } from "../app/helpers";
import { localeString, Text, View } from "./Themed";
import IconButton from "./IconButton";
import Colors from "../constants/Colors";

export default ({
  sum,
  date,
  setDate = () => {},
  savePress,
}: {
  sum: number;
  date?: Date;
  setDate?: (date: Date) => void;
  savePress: () => void;
}) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);
  return (
    <View style={styles.outerContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sumText}>{localeString("sumBalance")}</Text>
        <Text style={styles.valueText}>{formatCurrency(sum)}</Text>
        <TouchableOpacity
          style={styles.dateContainer}
          disabled={!date}
          onPress={() => setPickerVisible(true)}
        >
          <Text style={styles.dateText}>
            {date ? formatDate(date) : localeString("current")}
          </Text>
        </TouchableOpacity>
      </View>
      {!date && (
        <IconButton iconRes="save" label="Speichern" onPress={savePress} />
      )}
      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="date"
        date={date}
        onConfirm={(date: Date) => {
          setPickerVisible(false);
          setDate(date);
        }}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
    dateContainer: {
      flexDirection: "row",
      marginStart: 0,
    },
    dateText: {
      marginTop: 4,
      fontSize: 12,
      color: col.textLight,
    },
    outerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 24,
    },
    sumText: {
      height: 24,
      fontSize: 20,
      fontFamily: "Inter_600SemiBold",
    },
    valueText: {
      marginTop: 4,
      fontSize: 32,
      fontFamily: "Inter_700Bold",
    },
  });
