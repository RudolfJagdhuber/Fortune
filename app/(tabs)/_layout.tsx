import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { IconRes } from "../../constants/Interfaces";
import Strings from "../../constants/Strings";
import { localeString } from "../../components/Themed";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: IconRes; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tabIconSelected,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: localeString("home"),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          title: localeString("home"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="area-chart" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
