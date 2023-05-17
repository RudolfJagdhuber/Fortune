import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Fab from "./Home/Fab";
import Header from "./Home/Header";
import ListElement from "./Home/ListElement";
import { sumAssets } from "../app/helpers";
import SumHeader from "./SumHeader";
import { View } from "./Themed";
import { TimelineElement } from "../constants/Interfaces";
import { useRouter } from "expo-router";

export default ({
  tlElem,
  index = -1,
  setDate = () => {},
}: {
  tlElem: TimelineElement;
  index?: number;
  setDate?: (date: Date) => void;
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SumHeader
        sum={sumAssets(tlElem.assets, "all")}
        date={index >= 0 ? new Date(tlElem.date) : undefined}
        setDate={setDate}
        savePress={() => {
          router.push({
            pathname: "/save",
            params: {
              data: JSON.stringify(tlElem),
              isExisting: "false",
            },
          });
        }}
      />
      <View style={{ height: 16 }} />
      <ScrollView>
        <Header
          titleKey="positiveAssets"
          sum={sumAssets(tlElem.assets, "positive")}
        />
        {tlElem.assets
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
                    tlElemIndex: index,
                  },
                });
              }}
            />
          ))}
        <View style={{ height: 16 }} />
        <Header
          titleKey="negativeAssets"
          sum={sumAssets(tlElem.assets, "negative")}
        />
        {tlElem.assets
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
                    tlElemIndex: index,
                  },
                });
              }}
            />
          ))}
        <View style={{ height: 40 }} />
      </ScrollView>
      <Fab
        iconRes="plus"
        onPress={() => {
          router.push({ pathname: "/add", params: { tlElemIndex: index } });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});
