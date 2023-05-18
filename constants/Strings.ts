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
  savePoint: string;
  savePointNew: string;
  savePointEdit: string;
  saveDescNew: string;
  saveDescEdit: string;
  date: string;
  current: string;
  monthName: string[];
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
  savePoint: "Speicherpunkt",
  savePointNew: "Neuer Speicherpunkt",
  savePointEdit: "Speicherpunkt bearbeiten",
  saveDescNew:
    "Hierdurch wird ein neuer Eintrag mit allen aktuellen Werten zum angegebenen Datum gespeichert.",
  saveDescEdit:
    "Hier kann ein existierender Speicherpunkt bearbeitet oder gelöscht werden.",
  date: "Datum",
  current: "Aktueller Stand",
  monthName: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
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
  savePoint: "Savepoint",
  savePointNew: "New Savepoint",
  savePointEdit: "Edit Savepoint",
  saveDescNew:
    "Here you can create a new savepoint with all current entries for a given date.",
  saveDescEdit: "In this menu you can edit or delete an existing savepoint.",
  date: "Date",
  current: "Current Status",
  monthName: [
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

export default {
  de: de,
  en: en,
};
