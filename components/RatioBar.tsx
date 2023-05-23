import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AssetElement } from "../constants/Interfaces";
import Colors from "../constants/Colors";
import { Text, View } from "./Themed";
import { formatCurrency, sumAssets } from "../app/helpers";

const computeBarRatio = (assets: AssetElement[], negative: boolean): number => {
  const MIN = 0.02;
  if (assets.length == 0) return MIN;
  const pos = sumAssets(assets, "positive");
  const neg = Math.abs(sumAssets(assets, "negative"));
  if (negative) {
    if (neg === 0) return MIN;
    if (neg > pos) return 1;
    return Math.max(neg / (pos + neg), MIN);
  } else {
    if (pos === 0) return MIN;
    if (pos > neg) return 1;
    return Math.max(pos / (pos + neg), MIN);
  }
};

export default ({
  assets,
  negative = false,
  inlineSum = false,
  height = 24,
}: {
  assets: AssetElement[];
  negative?: boolean;
  inlineSum?: boolean;
  height?: number;
}) => {
  const MIN_PERC = 0.025;
  const data = assets.filter((x) => (negative ? x.value < 0 : x.value > 0));
  const sum = Math.abs(sumAssets(data));
  const barRatio = computeBarRatio(assets, negative);
  const iconSize = height / 2.25;
  const styles = makeStyles(
    Colors[useColorScheme() ?? "light"],
    height,
    negative
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: barRatio, backgroundColor: "transparent" }}>
        {data.length === 0 ? (
          <View style={styles.emptyBar} />
        ) : data.length === 1 ? (
          <View style={styles.singleBar}>
            {(Math.abs(data[0].value) / sum) * barRatio > MIN_PERC && (
              <FontAwesome
                name={data[0].icon}
                size={iconSize}
                style={styles.icon}
              />
            )}
          </View>
        ) : (
          <View style={styles.multiBarContainer}>
            <View style={[styles.barStart, { flex: Math.abs(data[0].value) }]}>
              {(Math.abs(data[0].value) / sum) * barRatio > MIN_PERC && (
                <FontAwesome
                  name={data[0].icon}
                  size={iconSize}
                  style={styles.icon}
                />
              )}
            </View>
            {data.slice(1, -1).map((asset) => (
              <View
                key={asset.key}
                style={[styles.barMid, { flex: Math.abs(asset.value) }]}
              >
                {(Math.abs(asset.value) / sum) * barRatio > MIN_PERC && (
                  <FontAwesome
                    name={asset.icon}
                    size={iconSize}
                    style={styles.icon}
                  />
                )}
              </View>
            ))}
            <View
              style={[
                styles.barEnd,
                { flex: Math.abs(data[data.length - 1].value) },
              ]}
            >
              {(Math.abs(data[data.length - 1].value) / sum) * barRatio >
                MIN_PERC && (
                <FontAwesome
                  name={data[data.length - 1].icon}
                  size={iconSize}
                  style={styles.icon}
                />
              )}
            </View>
          </View>
        )}
      </View>
      {inlineSum && <Text style={styles.sumText}>{formatCurrency(sum)}</Text>}
      <View style={{ flex: 1 - barRatio, backgroundColor: "transparent" }} />
    </View>
  );
};

const makeStyles = (
  col: typeof Colors.light,
  height: number,
  negative: boolean
) =>
  StyleSheet.create({
    barStart: {
      minWidth: 6,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: negative ? col.negative : col.positive,
      borderTopStartRadius: 4,
      borderBottomStartRadius: 4,
    },
    barMid: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: negative ? col.negative : col.positive,
      marginStart: 1,
    },
    barEnd: {
      minWidth: 6,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: negative ? col.negative : col.positive,
      borderTopEndRadius: 4,
      borderBottomEndRadius: 4,
      marginStart: 1,
    },
    container: {
      flexDirection: "row",
      height: height,
      backgroundColor: "transparent",
    },
    emptyBar: {
      flex: 1,
      backgroundColor: negative ? col.negative : col.positive,
      borderRadius: 4,
    },
    icon: {
      color: col.background,
    },
    multiBarContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
    },
    singleBar: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: negative ? col.negative : col.positive,
      borderRadius: 4,
    },
    sumText: {
      fontSize: height * 0.666,
      marginStart: 8,
      fontFamily: "Inter_600SemiBold",
      color: negative ? col.negative : col.positive,
    },
  });
