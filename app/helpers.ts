import { AssetElement } from "../constants/Interfaces";

const formatCurrency = (sum: number): string => {
  return sum.toLocaleString("en", { minimumFractionDigits: 2 }) + " €";
};

// TODO
const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString();
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

export { formatCurrency, formatDate, sumAssets };
