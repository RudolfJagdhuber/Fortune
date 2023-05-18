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
  const styles = makeStyles(col, data.value > 0);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outerContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome name={data.icon} size={20} style={styles.icon} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {data.title}
          </Text>
          {data.description && (
            <Text style={styles.subtitleText} numberOfLines={2}>
              {data.description}
            </Text>
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

const makeStyles = (col: typeof Colors.light, positive: boolean) =>
  StyleSheet.create({
    icon: {
      color: col.text,
    },
    iconContainer: {
      width: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    outerContainer: {
      marginHorizontal: 24,
      marginBottom: 4,
      flexDirection: "row",
      alignItems: "center",
      height: 64,
      padding: 16,
      gap: 16,
      backgroundColor: positive ? col.boxPositive : col.boxNegative,
      borderColor: positive ? col.boxOutlinePositive : col.boxOutlineNegative,
      borderRadius: 8,
      borderWidth: 1,
    },
    subtitleText: {
      fontSize: 12,
      color: col.textLight,
    },
    textContainer: {
      flex: 1,
      backgroundColor: "transparent",
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
