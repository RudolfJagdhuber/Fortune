import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "../../constants/Colors";
import Icons from "../../constants/Icons";
import { formatCurrency } from "../../app/helpers";
import { localeString, Text, View } from "../Themed";
import Strings from "../../constants/Strings";
import { IconRes } from "../../constants/Interfaces";
import IconButton from "../IconButton";

const IconRow = ({
  iconArray,
  icon,
  setIcon,
  rowStyle,
}: {
  iconArray: IconRes[];
  icon: IconRes;
  setIcon: (iconRes: IconRes) => void;
  rowStyle: any;
}) => (
  <View style={rowStyle}>
    {iconArray.map((ic) => (
      <IconButton
        key={ic}
        iconRes={ic}
        active={ic === icon}
        onPress={() => {
          setIcon(ic);
        }}
      />
    ))}
  </View>
);

export default ({
  icon,
  setIcon,
}: {
  icon: IconRes;
  setIcon: (iconRes: IconRes) => void;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{localeString("icon")}</Text>
      <IconRow
        iconArray={Icons.slice(0, 5)}
        icon={icon}
        setIcon={setIcon}
        rowStyle={styles.row}
      />
      <IconRow
        iconArray={Icons.slice(5, 10)}
        icon={icon}
        setIcon={setIcon}
        rowStyle={styles.row}
      />
      <IconRow
        iconArray={Icons.slice(10, 15)}
        icon={icon}
        setIcon={setIcon}
        rowStyle={styles.row}
      />
    </View>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
    container: {},
    header: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
    },
    row: {
      flexDirection: "row",
      marginVertical: 8,
      justifyContent: "space-between",
    },
  });
