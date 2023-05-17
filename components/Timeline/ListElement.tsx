import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { formatCurrency, formatDate, sumAssets } from "../../app/helpers";
import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";
import { TimelineElement } from "../../constants/Interfaces";
import RatioBar from "../RatioBar";

export default ({
  data,
  onPress = () => {},
}: {
  data: TimelineElement;
  onPress?: () => void;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.dateText}>{formatDate(data.date)}</Text>
          <Text style={styles.valueText}>
            {formatCurrency(sumAssets(data.assets))}
          </Text>
        </View>
        <RatioBar assets={data.assets} inlineSum={true} height={16} />
        <RatioBar
          assets={data.assets}
          negative={true}
          inlineSum={true}
          height={16}
        />
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 24,
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
      gap: 8,
      backgroundColor: col.boxNeutral,
      borderColor: col.boxOutlineNeutral,
      borderRadius: 8,
      borderWidth: 1,
    },
    dateText: {
      flex: 1,
      fontSize: 14,
      color: col.text,
    },
    headerContainer: {
      flexDirection: "row",
      backgroundColor: "transparent",
      marginBottom: 4,
    },
    valueText: {
      fontFamily: "Inter_700Bold",
      fontSize: 14,
    },
  });
