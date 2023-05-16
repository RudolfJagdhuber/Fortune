import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Md5 } from "ts-md5";
import Fab from "../../components/Home/Fab";
import Header from "../../components/Home/Header";
import ListElement from "../../components/Home/ListElement";
import { sumAssets } from "../helpers";
import SumHeader from "../../components/SumHeader";
import { View } from "../../components/Themed";
import { AssetElement, TimelineElement } from "../../constants/Interfaces";
import { useRouter, useSearchParams } from "expo-router";
import uuid from "react-native-uuid";

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<AssetElement[]>();

  const router = useRouter();
  const { newDataMd5 } = useSearchParams();

  const loadData = () => {
    console.log("Load triggered!");
    AsyncStorage.getItem("data").then((raw_data) => {
      console.log("Load finished!");
      if (raw_data != null && raw_data != "[]") {
        setData(JSON.parse(raw_data));
        // console.log("Loaded data: " + raw_data);
      } else {
        setData([]);
        // console.log("No Stored Data found.");
      }
      setLoading(false);
    });
  };

  if (!isLoading) {
    if (data) {
      console.log("Has data");
      console.log("Old: " + Md5.hashStr(JSON.stringify(data)));
      console.log("New: " + newDataMd5);
      if (newDataMd5 && newDataMd5 !== Md5.hashStr(JSON.stringify(data))) {
        setLoading(true);
        console.log("Re-Loading!");
        loadData();
      }
    } else {
      setLoading(true);
      console.log("No data");
      loadData();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading || !data ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : (
          <View style={styles.container}>
            <SumHeader
              sum={sumAssets(data, "all")}
              date="24.01.2023"
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
            <View style={{ height: 16 }} />
            <ScrollView>
              <Header
                titleKey="positiveAssets"
                sum={sumAssets(data, "positive")}
              />
              {data
                .filter((elem) => elem.value >= 0)
                .map((elem) => (
                  <ListElement
                    key={elem.title}
                    data={elem}
                    onPress={() => {
                      // setLoading(true);
                      router.push({
                        pathname: "/add",
                        params: {
                          data: JSON.stringify(elem),
                        },
                      });
                    }}
                  />
                ))}
              <View style={{ height: 16 }} />
              <Header
                titleKey="negativeAssets"
                sum={sumAssets(data, "negative")}
              />
              {data
                .filter((elem) => elem.value < 0)
                .map((elem) => (
                  <ListElement
                    key={elem.title}
                    data={elem}
                    onPress={() => {
                      router.push({
                        pathname: "/add",
                        params: {
                          data: JSON.stringify(elem),
                        },
                      });
                    }}
                  />
                ))}
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        )}
        <Fab
          iconRes="plus"
          onPress={() => {
            // setLoading(true);
            router.push({ pathname: "/add" });
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});
