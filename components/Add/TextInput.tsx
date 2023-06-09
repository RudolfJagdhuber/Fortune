import React from "react";
import { StyleSheet, TextInput, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { localeString, Text, View } from "../Themed";
import Strings from "../../constants/Strings";

export default ({
  titleRes,
  descriptionRes,
  text,
  setText,
  errorRes,
}: {
  titleRes: keyof typeof Strings.de;
  descriptionRes: keyof typeof Strings.de;
  text: string;
  setText: (text: string) => void;
  errorRes?: keyof typeof Strings.de;
}) => {
  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);
  return (
    <View>
      <Text style={styles.header}>{localeString(titleRes)}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          returnKeyType="done"
          placeholder={localeString(descriptionRes)}
        />
      </View>
      <Text style={styles.errorTxt}>
        {errorRes ? localeString(errorRes) : ""}
      </Text>
    </View>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
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
      fontSize: 14,
    },
  });
