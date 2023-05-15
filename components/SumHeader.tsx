import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { formatCurrency } from "../app/helpers";
import { localeString, Text, View } from "./Themed";
import IconButton from "./IconButton";
import Colors from "../constants/Colors";

export default ({
  sum,
  date,
  savePress,
}: {
  sum: number;
  date: string;
  savePress: () => void;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);
  return (
    <View style={styles.outerContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sumText}>{localeString("sumBalance")}</Text>
        <Text style={styles.valueText}>{formatCurrency(sum)}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <IconButton iconRes="save" label="Speichern" onPress={() => {}} />
    </View>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
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
      marginTop: 8,
      fontSize: 32,
      fontFamily: "Inter_700Bold",
    },
  });
