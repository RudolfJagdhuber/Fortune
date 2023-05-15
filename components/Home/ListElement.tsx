import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { formatCurrency } from "../../app/helpers";
import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";
import { AssetElement } from "../../constants/Interfaces";

export default ({
  data,
  onPress,
}: {
  data: AssetElement;
  onPress: () => void;
}) => {
  const col = Colors[useColorScheme() ?? "light"];
  const styles = makeStyles(col);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outerContainer}>
        <FontAwesome name={data.icon} size={24} style={styles.icon} />
        <View style={{ flex: 1, backgroundColor: "#00000000" }}>
          <Text style={styles.titleText}>{data.title}</Text>
          {data.description && (
            <Text style={styles.subtitleText}>{data.description}</Text>
          )}
        </View>
        <Text
          style={[
            styles.valueText,
            { color: data.value > 0 ? col.positive : col.negative },
          ]}
        >
          {formatCurrency(data.value)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
    icon: {
      color: col.text,
    },
    outerContainer: {
      marginTop: 8,
      marginHorizontal: 24,
      flexDirection: "row",
      alignItems: "center",
      height: 64,
      padding: 16,
      gap: 16,
      backgroundColor: col.boxFill,
      borderColor: col.boxOutline,
      borderRadius: 8,
      borderWidth: 1,
      shadowColor: col.dropShadow,
      shadowOpacity: 0.5,
      shadowOffset: { width: 1, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    subtitleText: {
      fontSize: 12,
      color: col.textLight,
    },
    titleText: {
      fontFamily: "Inter_700Bold",
      fontSize: 14,
    },
    valueText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
    },
  });
