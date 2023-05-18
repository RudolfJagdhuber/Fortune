import React from "react";
import { StyleSheet, TextInput, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "../../constants/Colors";
import { localeString, Text, View } from "../Themed";
import Strings from "../../constants/Strings";

export default ({
  titleRes,
  value,
  setValue,
  isPositive = true,
  errorRes,
}: {
  titleRes: keyof typeof Strings.de;
  value: string;
  setValue: (value: string) => void;
  isPositive?: boolean;
  errorRes?: keyof typeof Strings.de;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);
  return (
    <View>
      <Text style={styles.header}>{localeString(titleRes)}</Text>
      <View style={styles.inputContainer}>
        {!isPositive && <Text style={styles.sign}>-</Text>}
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          placeholder="0"
          keyboardType="numeric"
        />
        <FontAwesome name={"euro"} size={20} style={styles.currencyIcon} />
      </View>
      <Text style={styles.errorTxt}>
        {errorRes ? localeString(errorRes) : ""}
      </Text>
    </View>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
    currencyIcon: {
      marginStart: 16,
      color: col.textLight,
    },
    errorTxt: {
      height: 32,
      paddingTop: 2,
      paddingStart: 4,
      fontSize: 11,
      textAlign: "right",
      color: col.negative,
    },
    header: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      height: 48,
      marginTop: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      backgroundColor: col.buttonSecondary,
    },
    textInput: {
      flex: 1,
      height: 48,
      color: col.text,
      fontFamily: "Inter_600SemiBold",
      fontSize: 18,
    },
    sign: {
      fontSize: 18,
      marginEnd: 4,
      color: col.textLight,
      fontFamily: "Inter_600SemiBold",
    },
  });
