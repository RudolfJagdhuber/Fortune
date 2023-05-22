import { localeString } from "../components/Themed";
import { AssetElement, TimelineElement } from "../constants/Interfaces";

const formatCurrency = (sum: number): string => {
  return sum.toLocaleString("en", { minimumFractionDigits: 2 }) + " €";
};

const formatDate = (date: Date | string): string => {
  if (typeof date === "string") date = new Date(date);
  return (
    date.getDate() +
    ". " +
    localeString("monthName", date.getMonth()) +
    " " +
    date.getFullYear()
  );
};

const sortTL = (a: TimelineElement, b: TimelineElement): number => {
  return Date.parse(b.date) - Date.parse(a.date);
};

const sumAssets = (
  data: AssetElement[],
  which: "positive" | "negative" | "all" = "all"
): number => {
  return data
    .filter((elem) =>
      which === "positive"
        ? elem.value >= 0
        : which === "negative"
        ? elem.value < 0
        : true
    )
    .reduce((sum, elem) => {
      return sum + elem.value;
    }, 0);
};

export { formatCurrency, formatDate, sortTL, sumAssets };
