import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "../constants/Colors";
import { Text, View } from "./Themed";

export default ({
  iconRes,
  label,
  onPress,
  active = false,
}: {
  iconRes: React.ComponentProps<typeof FontAwesome>["name"];
  label?: string;
  onPress: () => void;
  active?: boolean;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"], active);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <FontAwesome name={iconRes} size={20} style={styles.buttonIcon} />
        {label && <Text style={styles.buttonLabel}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (col: typeof Colors.light, active: boolean) =>
  StyleSheet.create({
    buttonContainer: {
      height: 56,
      width: 56,
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      backgroundColor: active ? col.buttonPrimary : col.buttonSecondary,
      borderRadius: 12,
    },
    buttonIcon: {
      marginTop: 4,
      color: active ? col.buttonPrimaryContent : col.textLight,
    },
    buttonLabel: {
      fontSize: 8,
      color: active ? col.buttonPrimaryContent : col.textLight,
    },
  });
