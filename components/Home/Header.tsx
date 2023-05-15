import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { formatCurrency } from "../../app/helpers";
import { localeString, Text, View } from "../Themed";
import Strings from "../../constants/Strings";

export default ({
  titleKey,
  sum,
}: {
  titleKey: keyof typeof Strings.de;
  sum: number;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"], sum);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{localeString(titleKey)}</Text>
      <Text style={styles.headerSum}>{formatCurrency(sum)}</Text>
    </View>
  );
};

const makeStyles = (col: typeof Colors.light, sum: number) =>
  StyleSheet.create({
    header: {
      flex: 1,
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
    },
    headerContainer: {
      marginTop: 24,
      marginBottom: 16,
      marginHorizontal: 24,
      flexDirection: "row",
      alignItems: "center",
    },
    headerSum: {
      fontSize: 12,
      color: sum > 0 ? col.positive : sum < 0 ? col.negative : col.textLight,
    },
  });
