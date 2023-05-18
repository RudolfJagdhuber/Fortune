import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Supported Languages
const LangsList = ["de", "en"];
type Langs = "de" | "en";

type IconRes = React.ComponentProps<typeof FontAwesome>["name"];

interface AssetElement {
  key: string;
  icon: IconRes;
  title: string;
  description?: string;
  value: number;
  lastUpdate: string;
}

interface TimelineElement {
  key: string;
  assets: AssetElement[];
  date: string;
}

export { AssetElement, IconRes, Langs, LangsList, TimelineElement };
