import { StyleSheet } from "react-native";

import SumHeader from "../../components/SumHeader";
import { View } from "../../components/Themed";

export default function TimelineScreen() {
  return (
    <View style={styles.container}>
      <SumHeader
        sum={9234.09}
        date="24.01.2023"
        savePress={() => alert("Hello 2")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
});
