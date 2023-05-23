import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { formatCurrency } from "../../app/helpers";
import { localeString, Text, View } from "../Themed";
import Strings from "../../constants/Strings";

export default ({
  positive,
  onPress,
}: {
  positive: boolean;
  onPress: (pos: boolean) => void;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"], positive);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={() => onPress(true)}>
        <View style={styles.switchLeft}>
          <Text style={styles.switchLeftText}>
            {localeString("positiveAssets")}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={() => onPress(false)}>
        <View style={styles.switchRight}>
          <Text style={styles.switchRightText}>
            {localeString("negativeAssets")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const makeStyles = (col: typeof Colors.light, positive: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    switchLeft: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: positive ? col.switchPositive : col.buttonSecondary,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderWidth: 1,
      borderRightWidth: positive ? 1 : 0,
      borderColor: col.background, //positive ? col.positive : col.boxOutlineNeutral,
      flex: 1,
    },
    switchLeftText: {
      fontFamily: positive ? "Inter_700Bold" : "Inter_600SemiBold",
      color: positive ? col.buttonPrimaryContent : col.textLight,
      fontSize: 13,
    },
    switchRight: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: !positive ? col.switchNegative : col.buttonSecondary,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderWidth: 1,
      borderLeftWidth: !positive ? 1 : 0,
      borderColor: col.background, //positive ? col.positive : col.boxOutlineNeutral,
      flex: 1,
    },
    switchRightText: {
      fontFamily: !positive ? "Inter_700Bold" : "Inter_600SemiBold",
      color: !positive ? col.buttonPrimaryContent : col.textLight,
      fontSize: 13,
    },
    touchable: {
      flex: 1,
      height: 40,
    },
  });
