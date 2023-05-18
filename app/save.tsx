import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Md5 } from "ts-md5";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text, View, localeString } from "../components/Themed";
import { TimelineElement } from "../constants/Interfaces";
import { Stack, useSearchParams } from "expo-router";
import SaveButton from "../components/SaveButton";
import Colors from "../constants/Colors";
import { formatCurrency, sumAssets } from "./helpers";
import DateInput from "../components/Save/DateInput";
import SummaryWithBar from "../components/Save/SummaryWithBar";

export default () => {
  const router = useRouter();
  const { data, isExisting } = useSearchParams();
  if (typeof data !== "string" || typeof isExisting !== "string") {
    router.back();
    return; // ERROR
  }
  const [tlElem, setTlElem] = useState<TimelineElement>(JSON.parse(data));

  const upDate = (date: Date) =>
    setTlElem({
      key: tlElem.key,
      assets: tlElem.assets,
      date: date.toISOString(),
    });

  const deleteTimeline = () => {
    AsyncStorage.getItem("timeline").then((raw_dataTL) => {
      console.log("Loaded TL: " + raw_dataTL);
      let storage: TimelineElement[];
      if (raw_dataTL != null && raw_dataTL != "[]") {
        storage = JSON.parse(raw_dataTL);
        storage = storage.filter((obj) => obj.key !== tlElem.key);
        AsyncStorage.setItem("timeline", JSON.stringify(storage));
      } else return;
      router.push({
        pathname: "/",
        params: { newTlMd5: Md5.hashStr(JSON.stringify(storage)) },
      });
    });
  };

  const saveTimeline = () => {
    AsyncStorage.getItem("timeline").then((raw_dataTL) => {
      console.log("Loaded TL: " + raw_dataTL);
      let storage: TimelineElement[];
      if (raw_dataTL != null && raw_dataTL != "[]") {
        storage = JSON.parse(raw_dataTL);
        const existingIndex = storage.findIndex(
          (obj) => obj.key === tlElem.key
        );
        if (existingIndex !== -1) storage[existingIndex] = tlElem;
        else storage.push(tlElem);
      } else {
        storage = [tlElem];
        console.log("Initialized and Stored Data!");
      }
      AsyncStorage.setItem("timeline", JSON.stringify(storage));
      router.push({
        pathname: "/",
        params: { newTlMd5: Md5.hashStr(JSON.stringify(storage)) },
      });
    });
  };

  const styles = makeStyles(Colors[useColorScheme() ?? "light"]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: localeString("savePoint"),
          headerRight: () =>
            isExisting === "true" && (
              <TouchableOpacity
                style={styles.btnDeleteContainer}
                onPress={deleteTimeline}
              >
                <FontAwesome name="trash" size={20} style={styles.btnDelete} />
              </TouchableOpacity>
            ),
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Text style={styles.pageHeaderText}>
            {localeString(
              isExisting === "true" ? "savePointEdit" : "savePointNew"
            )}
          </Text>
          <Text style={styles.pageDescText}>
            {localeString(
              isExisting === "true" ? "saveDescEdit" : "saveDescNew"
            )}
          </Text>
          <DateInput
            titleRes="date"
            date={new Date(tlElem.date)}
            setDate={upDate}
          />
          <Text style={styles.sumHeaderText}>{localeString("sumBalance")}</Text>
          <Text style={styles.sumText}>
            {formatCurrency(sumAssets(tlElem.assets))}
          </Text>
          <SummaryWithBar assets={tlElem.assets} />
          <SummaryWithBar assets={tlElem.assets} negative={true} />
          <View style={{ height: 40 }} />
        </ScrollView>
        <View style={styles.btnSaveContainer}>
          <SaveButton onPress={saveTimeline} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const makeStyles = (col: typeof Colors.light) =>
  StyleSheet.create({
    btnDelete: {
      color: col.negative,
    },
    btnDeleteContainer: {
      height: 40,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    btnSaveContainer: {
      marginBottom: 24,
      marginTop: 8,
      marginHorizontal: 24,
    },
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 40,
    },
    pageDescText: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: col.textLight,
      marginTop: 8,
      marginBottom: 40,
    },
    pageHeaderText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 20,
    },
    sumHeaderText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 20,
      marginTop: 40,
    },
    sumText: {
      fontFamily: "Inter_700Bold",
      fontSize: 32,
      marginTop: 8,
      marginBottom: 16,
    },
  });
