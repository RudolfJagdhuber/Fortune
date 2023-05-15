import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface AssetElement {
  key: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  title: string;
  description?: string;
  value: number;
  lastUpdate: string;
}

export { AssetElement };
