import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { localeString, Text, View } from "../Themed";

export default ({
  active,
  onPress,
}: {
  active: boolean;
  onPress: () => void;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"], active);
  return (
    <TouchableOpacity
      onPress={active ? onPress : () => {}}
      style={styles.container}
    >
      <Text style={styles.text}>{localeString("save").toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const makeStyles = (col: typeof Colors.light, active: boolean) =>
  StyleSheet.create({
    container: {
      height: 56,
      marginTop: 40,
      backgroundColor: active ? col.buttonPrimary : col.tabIconDefault,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 14,
      fontFamily: "Inter_700Bold",
      color: col.buttonPrimaryContent,
    },
  });
