import React, { useState } from "react";
import { ActivityIndicator, Platform, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Md5 } from "ts-md5";
import { View } from "../../components/Themed";
import { TimelineElement } from "../../constants/Interfaces";
import { useSearchParams } from "expo-router";
import uuid from "react-native-uuid";

import AssetsPage from "../../components/AssetsPage";

export default () => {
  const { newDataMd5 } = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [tlElem, setTlElem] = useState<TimelineElement>();

  const loadData = () => {
    AsyncStorage.getItem("data").then((raw) => {
      if (raw != null && raw != "[]")
        setTlElem({
          key: uuid.v4().toString(),
          assets: JSON.parse(raw),
          date: new Date().toISOString(),
        });
      else
        setTlElem({
          key: uuid.v4().toString(),
          assets: [],
          date: new Date().toISOString(),
        });
      setLoading(false);
    });
  };

  if (!isLoading) {
    if (tlElem) {
      const oldDataMd5 = Md5.hashStr(JSON.stringify(tlElem.assets));
      if (newDataMd5 && newDataMd5 !== oldDataMd5) {
        setLoading(true);
        loadData();
      }
    } else {
      setLoading(true);
      loadData();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading || !tlElem ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : (
          <View
            style={{ flex: 1, marginTop: Platform.OS === "android" ? 24 : 0 }}
          >
            <AssetsPage tlElem={tlElem} />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};
