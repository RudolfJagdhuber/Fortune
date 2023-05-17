import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Md5 } from "ts-md5";
import { sumAssets } from "../helpers";
import SumHeader from "../../components/SumHeader";
import { Text, View, localeString } from "../../components/Themed";
import { AssetElement, TimelineElement } from "../../constants/Interfaces";
import { useRouter, useSearchParams } from "expo-router";
import Overview from "../../components/Timeline/Overview";
import uuid from "react-native-uuid";
import ListElement from "../../components/Timeline/ListElement";

export default function TimelineScreen() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<AssetElement[]>();
  const [dataTL, setDataTL] = useState<TimelineElement[]>();

  const router = useRouter();
  const { newTlMd5 } = useSearchParams();

  const loadData = () => {
    console.log("TL Load triggered!");
    AsyncStorage.getItem("timeline").then((raw_dataTL) => {
      console.log("TL Load finished!");
      if (raw_dataTL != null && raw_dataTL != "[]") {
        setDataTL(JSON.parse(raw_dataTL));
      } else {
        setDataTL([]);
      }
      AsyncStorage.getItem("data").then((raw_data) => {
        console.log("Normal Load finished!");
        if (raw_data != null && raw_data != "[]") {
          setData(JSON.parse(raw_data));
        } else {
          setData([]);
        }
        setLoading(false);
      });
    });
  };

  if (!isLoading) {
    if (data && dataTL) {
      const oldTlMd5 = Md5.hashStr(JSON.stringify(dataTL));
      console.log("OldTL: " + oldTlMd5 + "  -  NewTL: " + newTlMd5);
      if (newTlMd5 && newTlMd5 !== oldTlMd5) {
        setLoading(true);
        console.log("TL Re-Loading!");
        loadData();
      }
    } else {
      setLoading(true);
      console.log("TL No data");
      loadData();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading || !data || !dataTL ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : (
          <View style={styles.container}>
            <SumHeader
              sum={sumAssets(data, "all")}
              savePress={() => {
                const timelineElem: TimelineElement = {
                  key: uuid.v4().toString(),
                  assets: data,
                  date: new Date().toISOString(),
                };
                router.push({
                  pathname: "/save",
                  params: {
                    data: JSON.stringify(timelineElem),
                    isExisting: "false",
                  },
                });
              }}
            />
            <Overview
              sumPos={sumAssets(data, "positive")}
              sumNeg={sumAssets(data, "negative")}
            />
            <View style={{ height: 16 }} />
            <ScrollView>
              <Text style={styles.header}>{localeString("timeline")}</Text>
              {dataTL.map((elem, idx) => (
                <ListElement
                  key={elem.key}
                  data={elem}
                  onPress={() => {
                    router.push({
                      pathname: "/details",
                      params: { tlElemIndex: idx.toString() },
                    });
                  }}
                />
              ))}
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    marginTop: 24,
    marginBottom: 24,
    marginHorizontal: 24,
  },
});
