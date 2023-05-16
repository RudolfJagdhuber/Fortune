import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

import { formatCurrency } from "../../app/helpers";
import { localeString, Text, View } from "../Themed";
import Colors from "../../constants/Colors";

export default ({ sumPos, sumNeg }: { sumPos: number; sumNeg: number }) => {
  const styles = makeStyles(
    Colors[useColorScheme() ?? "light"],
    sumPos,
    sumNeg
  );
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>{localeString("positiveAssets")}</Text>
        <Text style={styles.valuePosText}>{formatCurrency(sumPos)}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>{localeString("negativeAssets")}</Text>
        <Text style={styles.valueNegText}>
          {formatCurrency(Math.abs(sumNeg))}
        </Text>
      </View>
    </View>
  );
};

const makeStyles = (col: typeof Colors.light, sumPos: number, sumNeg: number) =>
  StyleSheet.create({
    headerText: {
      fontSize: 16,
      fontFamily: "Inter_600SemiBold",
    },
    innerContainer: {
      flex: 1,
      paddingEnd: 8,
    },
    outerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 40,
      marginHorizontal: 24,
    },
    valueNegText: {
      marginTop: 8,
      fontSize: 20,
      fontFamily: "Inter_700Bold",
      color: sumNeg === 0 ? col.textLight : col.negative,
    },
    valuePosText: {
      marginTop: 8,
      fontSize: 20,
      fontFamily: "Inter_700Bold",
      color: sumPos === 0 ? col.textLight : col.positive,
    },
  });
