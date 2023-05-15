import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import Fab from "../../components/Home/Fab";
import Header from "../../components/Home/Header";
import ListElement from "../../components/Home/ListElement";
import { useFocusEffect } from "@react-navigation/native";
import { sumAssets } from "../helpers";
import SumHeader from "../../components/SumHeader";
import { View } from "../../components/Themed";
import { AssetElement } from "../../constants/Interfaces";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<AssetElement[]>([]);

  const navigation = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("data").then((raw_data) => {
        if (raw_data != null && raw_data != "[]") {
          setData(JSON.parse(raw_data));
          console.log("Loaded data: " + raw_data);
        } else {
          setData([]);
          console.log("No Stored Data found.");

          // const EX_DATA: AssetElement[] = [
          //   {
          //     key: uuid.v4().toString(),
          //     icon: "home",
          //     title: "Sparkasse",
          //     description: "Mein Girokonto",
          //     value: 1234.59,
          //     lastUpdate: "2023-01-01",
          //   },
          //   {
          //     key: uuid.v4().toString(),
          //     icon: "home",
          //     title: "Splitwise",
          //     value: -234.09,
          //     lastUpdate: "2023-01-01",
          //   },
          // ];
          // setData(EX_DATA);
          // AsyncStorage.setItem("data", JSON.stringify(EX_DATA));
          // console.log("Initialized and Stored Data!");
        }
        setLoading(false);
      });
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator style={{ flex: 1 }} />
        ) : (
          <View style={styles.container}>
            <SumHeader
              sum={sumAssets(data, "all")}
              date="24.01.2023"
              savePress={() => alert("Hello")}
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
                      setLoading(true);
                      navigation.push({
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
                      setLoading(true);
                      navigation.push({
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
            setLoading(true);
            navigation.push({ pathname: "/add" });
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
