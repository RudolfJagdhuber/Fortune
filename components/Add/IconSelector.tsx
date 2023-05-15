import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { formatCurrency } from "../../app/helpers";
import { localeString, Text, View } from "../Themed";
import Strings from "../../constants/Strings";

export default () => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);
  return <View style={styles.container}></View>;
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
    },
  });
