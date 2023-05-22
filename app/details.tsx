import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Md5 } from "ts-md5";
import { Stack, useRouter, useSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import AssetsPage from "../components/AssetsPage";
import { TimelineElement } from "../constants/Interfaces";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";

export default () => {
  const router = useRouter();
  const { tlElemIndex, newDataMd5 } = useSearchParams();
  if (!tlElemIndex) return;

  const [isLoading, setLoading] = useState(false);
  const [tlElem, setTlElem] = useState<TimelineElement>();

  const loadData = () => {
    AsyncStorage.getItem("timeline").then((raw) => {
      if (raw != null && raw != "[]") setTlElem(JSON.parse(raw)[+tlElemIndex]);
      // else setTlElem([]);
      setLoading(false);
    });
  };

  if (!isLoading) {
    if (tlElem) {
      const oldDataMd5 = Md5.hashStr(JSON.stringify(tlElem.assets));
      console.log("OldDet: " + oldDataMd5 + "  -  NewDet: " + newDataMd5);
      if (newDataMd5 && newDataMd5 !== oldDataMd5) {
        setLoading(true);
        loadData();
      }
    } else {
      setLoading(true);
      loadData();
    }
  }

  const deleteTlElem = () => {
    setLoading(true);
    AsyncStorage.getItem("timeline").then((raw) => {
      let storage: TimelineElement[];
      if (raw === null) {
        setLoading(false);
        return;
      }
      storage = JSON.parse(raw);
      storage.splice(+tlElemIndex, 1);
      AsyncStorage.setItem("timeline", JSON.stringify(storage));
      router.push({
        pathname: "/",
        params: { newTlMd5: Md5.hashStr(JSON.stringify(storage)) },
      });
      setLoading(false);
    });
  };

  const updateTlElem = (newTlElem: TimelineElement) => {
    setLoading(true);
    AsyncStorage.getItem("timeline").then((raw) => {
      let storage: TimelineElement[];
      if (raw === null) {
        setLoading(false);
        return;
      }
      storage = JSON.parse(raw);
      storage[+tlElemIndex] = newTlElem;
      AsyncStorage.setItem("timeline", JSON.stringify(storage));
      setTlElem(newTlElem);
      setLoading(false);
      router.push({
        pathname: "/",
        params: { newTlMd5: Md5.hashStr(JSON.stringify(storage)) },
      });
      // router.setParams({ newTlMd5: Md5.hashStr(JSON.stringify(storage)) });
    });
  };

  const upDate = (date: Date) => {
    if (!tlElem) return;
    const newTlElem: TimelineElement = {
      key: tlElem.key,
      assets: tlElem.assets,
      date: date.toISOString(),
    };
    updateTlElem(newTlElem);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={styles.btnDeleteContainer}
              onPress={deleteTlElem}
            >
              <FontAwesome name="trash" size={20} style={styles.btnDelete} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading || !tlElem ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : (
          <AssetsPage tlElem={tlElem} index={+tlElemIndex} setDate={upDate} />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  btnDelete: {
    color: Colors.light.negative,
  },
  btnDeleteContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
