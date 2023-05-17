import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { localeString, Text, View } from "../Themed";
import { AssetElement } from "../../constants/Interfaces";
import { formatCurrency, sumAssets } from "../../app/helpers";
import RatioBar from "../RatioBar";

export default ({
  assets,
  negative = false,
}: {
  assets: AssetElement[];
  negative?: boolean;
}) => {
  const sum = sumAssets(assets, negative ? "negative" : "positive");
  const styles = makeStyles(Colors[useColorScheme() ?? "light"], sum);

  return (
    <View>
      <Text style={styles.headerText}>
        {localeString(negative ? "negativeAssets" : "positiveAssets")}
      </Text>
      <Text style={styles.valueText}>{formatCurrency(Math.abs(sum))}</Text>
      <View style={styles.barContainer}>
        <RatioBar assets={assets} negative={negative} />
      </View>
    </View>
  );
};

const makeStyles = (col: typeof Colors.light, sum: number) =>
  StyleSheet.create({
    barContainer: {
      marginTop: 12,
    },
    headerText: {
      marginTop: 24,
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
    },
    valueText: {
      marginTop: 8,
      fontFamily: "Inter_700Bold",
      fontSize: 20,
      color: sum > 0 ? col.positive : sum < 0 ? col.negative : col.textLight,
    },
  });
