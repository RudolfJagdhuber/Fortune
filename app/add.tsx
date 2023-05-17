import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Md5 } from "ts-md5";
import uuid from "react-native-uuid";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { View, localeString } from "../components/Themed";
import { AssetElement, TimelineElement } from "../constants/Interfaces";
import { Stack, useSearchParams } from "expo-router";
import Switch from "../components/Add/Switch";
import TextInput from "../components/Add/TextInput";
import IconSelector from "../components/Add/IconSelector";
import SaveButton from "../components/SaveButton";
import Colors from "../constants/Colors";

export default () => {
  const router = useRouter();
  const { data, tlElemIndex } = useSearchParams();
  const isTimelineElem = tlElemIndex && typeof tlElemIndex === "string";
  const isExisting = data && typeof data === "string";
  const asset: AssetElement = isExisting
    ? JSON.parse(data)
    : {
        key: uuid.v4().toString(),
        icon: "money",
        title: "",
        subtitle: "",
        value: 0,
        lastUpdate: "",
      };
  const [isPositive, setPositive] = useState(asset.value >= 0);
  const [title, setTitle] = useState(asset.title);
  const [hasTitleError, setTitleError] = useState(asset.title === "");
  const [description, setDescription] = useState(asset.description ?? "");
  const [value, setValue] = useState(asset.value);
  const [valueText, setValueText] = useState(
    asset.value != 0 ? Math.abs(asset.value).toString() : ""
  );
  const [hasValueError, setValueError] = useState(false);
  const [icon, setIcon] = useState(asset.icon);

  const updateTitle = (text: string) => {
    setTitle(text);
    setTitleError(text.trim() === "");
  };

  const updateValue = (text: string) => {
    const text2 = text
      .replace(/^0+/, "")
      .replace(",", ".")
      .replace(/^\./, "0.")
      .replace(/^(\d+\.\d{2}).*/, "$1");

    setValueText(text2);
    setValueError(isNaN(+text2));
    if (!isNaN(+text2)) setValue(Math.abs(+text2) * (isPositive ? 1 : -1));
  };

  const bundleAsset = (): AssetElement => ({
    key: asset.key,
    icon: icon,
    title: title,
    description: description ?? undefined,
    value: value,
    lastUpdate: new Date().toISOString(),
  });

  const deleteAsset = () => {
    if (isTimelineElem) {
      AsyncStorage.getItem("timeline").then((raw) => {
        let storage: TimelineElement[];
        if (raw != null) {
          storage = JSON.parse(raw);
          storage[+tlElemIndex].assets = storage[+tlElemIndex].assets.filter(
            (obj) => obj.key !== asset.key
          );
          AsyncStorage.setItem("timeline", JSON.stringify(storage));
        } else return;
        router.push({
          pathname: "/details",
          params: {
            tlElemIndex: tlElemIndex,
            newDataMd5: Md5.hashStr(
              JSON.stringify(storage[+tlElemIndex].assets)
            ),
            newTlMd5: Md5.hashStr(JSON.stringify(storage)),
          },
        });
      });
    } else {
      AsyncStorage.getItem("data").then((raw) => {
        let storage: AssetElement[];
        if (raw != null && raw != "[]") {
          storage = JSON.parse(raw);
          storage = storage.filter((obj) => obj.key !== asset.key);
          AsyncStorage.setItem("data", JSON.stringify(storage));
        } else return;
        router.push({
          pathname: "/",
          params: { newDataMd5: Md5.hashStr(JSON.stringify(storage)) },
        });
      });
    }
  };

  const saveAsset = () => {
    if (isTimelineElem) {
      AsyncStorage.getItem("timeline").then((raw) => {
        const newAsset = bundleAsset();
        let storage: TimelineElement[];
        if (raw != null) {
          storage = JSON.parse(raw);
          if (storage[+tlElemIndex].assets.length > 0) {
            const existingIndex = storage[+tlElemIndex].assets.findIndex(
              (obj) => obj.key === asset.key
            );
            if (existingIndex !== -1)
              storage[+tlElemIndex].assets[existingIndex] = newAsset;
            else storage[+tlElemIndex].assets.push(newAsset);
          } else storage[+tlElemIndex].assets = [newAsset];
        } else return;
        AsyncStorage.setItem("timeline", JSON.stringify(storage));
        router.push({
          pathname: "/details",
          params: {
            tlElemIndex: tlElemIndex,
            newDataMd5: Md5.hashStr(
              JSON.stringify(storage[+tlElemIndex].assets)
            ),
            newTlMd5: Md5.hashStr(JSON.stringify(storage)),
          },
        });
      });
    } else {
      AsyncStorage.getItem("data").then((raw) => {
        const newAsset = bundleAsset();
        let storage: AssetElement[];
        if (raw != null && raw != "[]") {
          storage = JSON.parse(raw);
          const existingIndex = storage.findIndex(
            (obj) => obj.key === asset.key
          );
          if (existingIndex !== -1) storage[existingIndex] = newAsset;
          else storage.push(newAsset);
        } else storage = [newAsset];
        AsyncStorage.setItem("data", JSON.stringify(storage));
        router.push({
          pathname: "/",
          params: { newDataMd5: Md5.hashStr(JSON.stringify(storage)) },
        });
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: localeString(isExisting ? "edit" : "add"),
          headerRight: () =>
            isExisting && (
              <TouchableOpacity
                style={styles.btnDeleteContainer}
                onPress={deleteAsset}
              >
                <FontAwesome name="trash" size={20} style={styles.btnDelete} />
              </TouchableOpacity>
            ),
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Switch
            positive={isPositive}
            onPress={(pos: boolean) => {
              setPositive(pos);
              setValue(Math.abs(value) * (pos ? 1 : -1));
            }}
          />
          <View style={{ height: 32 }} />
          <TextInput
            titleRes="title"
            descriptionRes="titleHelper"
            text={title}
            setText={updateTitle}
            errorRes={hasTitleError ? "errorTitleMissing" : undefined}
          />
          <TextInput
            titleRes="description"
            descriptionRes="descriptionHelper"
            text={description}
            setText={setDescription}
          />
          <TextInput
            titleRes="value"
            descriptionRes="null"
            text={valueText}
            setText={updateValue}
            isMoney={true}
            isPositive={isPositive}
            errorRes={hasValueError ? "errorValueInvalid" : undefined}
          />
          <IconSelector icon={icon} setIcon={setIcon} />
        </ScrollView>
        <View style={styles.btnSaveContainer}>
          <SaveButton
            active={!hasTitleError && !hasValueError}
            onPress={saveAsset}
          />
        </View>
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
});
