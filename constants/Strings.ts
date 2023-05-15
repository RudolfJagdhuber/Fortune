interface strings {
  home: string;
  timeline: string;
  sumBalance: string;
  positiveAssets: string;
  negativeAssets: string;
  add: string;
  edit: string;
  title: string;
  titleHelper: string;
  description: string;
  descriptionHelper: string;
  value: string;
  icon: string;
  errorTitleMissing: string;
  errorValueInvalid: string;
  null: string;
  save: string;
}

const de: strings = {
  home: "Übersicht",
  timeline: "Verlauf",
  sumBalance: "Gesamt",
  positiveAssets: "Vermögen",
  negativeAssets: "Schulden",
  add: "Hinzufügen",
  edit: "Bearbeiten",
  title: "Titel",
  titleHelper: "Bitte einen Titel eingeben",
  description: "Beschreibung (Optional)",
  descriptionHelper: "Bitte eine Beschreibung eingeben",
  value: "Betrag",
  icon: "Symbol",
  errorTitleMissing: "Ein Titel wird benötigt",
  errorValueInvalid: "Bitte eine gültige Zahl eingeben",
  null: "0",
  save: "Speichern",
};

const en: strings = {
  home: "Overview",
  timeline: "Timeline",
  sumBalance: "Total Balance",
  positiveAssets: "Assets",
  negativeAssets: "Liabilities",
  add: "Add",
  edit: "Edit",
  title: "Title",
  titleHelper: "Please enter a title",
  description: "Description (optional)",
  descriptionHelper: "Please enter a description",
  value: "Value",
  icon: "Icon",
  errorTitleMissing: "",
  errorValueInvalid: "",
  null: "0",
  save: "Save",
};

export default {
  de: de,
  en: en,
};
