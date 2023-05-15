import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "../../constants/Colors";
import { View } from "../Themed";

export default ({
  iconRes,
  onPress,
}: {
  iconRes: React.ComponentProps<typeof FontAwesome>["name"];
  onPress: () => void;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.fabContainer}>
        <FontAwesome name={iconRes} size={24} style={styles.fabIcon} />
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
    fabContainer: {
      position: "absolute",
      height: 64,
      width: 64,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: col.buttonPrimary,
      borderRadius: 32,
      alignSelf: "flex-end",
      bottom: 24,
      right: 24,
      shadowColor: col.dropShadow,
      shadowOpacity: 0.75,
      shadowOffset: { width: 1, height: 2 },
      shadowRadius: 2,
      elevation: 4,
    },
    fabIcon: {
      color: col.buttonPrimaryContent,
      marginTop: 2,
    },
  });
