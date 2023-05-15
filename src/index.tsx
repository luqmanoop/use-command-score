import { useMemo } from "react";

import { commandScore } from "./lib";

interface CommandScore<T> {
  item: T;
  keywords: string;
  score?: number;
}

interface Options {
  keys?: string[];
  limit?: number;
}

function get<T, DefaultValue>(
  obj: T,
  path: string | string[],
  defaultValue?: DefaultValue
) {
  const keys = Array.isArray(path) ? path : path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result == null || typeof result !== "object") {
      return defaultValue;
    }
    result = result[key as keyof typeof result] as T;
  }

  return result === undefined ? defaultValue : result;
}

/**
 * Returns a list of matching items sorted by their score
 * @template T Type of the data
 * @param {string} query Search query
 * @param {Array<T>} data List of items to search
 * @example useCommandScore("45", [{ name: "foo", address: { code: '123' } }, { name: "bar", address: { code: '456' } }], {keys: ["name", "address.code"]})
 * // returns [{ name: "bar", address: { code: 456 } }]
 * @example useCommandScore("f", ["foo", "bar"])
 * // returns ["foo"]
 */
export function useCommandScore<T>(
  query: string,
  data: Array<T>,
  options?: Options
): T[] {
  const dataWithKeywords = useMemo(() => {
    return data.map(item => {
      const keys = options?.keys;
      if (!keys?.length) return { item, keywords: item };

      /* for array of objects, we get the value of key paths from the object,
       *  & join the result to make searchable keywords */
      const keywords = keys
        .map(key => {
          let value = get<T, string>(item, key, "");

          if (Array.isArray(value)) {
            value = value.filter(v => typeof v === "string").join(" ");
          }

          return typeof value === "string" ? value : "";
        })
        .join(" ");

      return { item, keywords };
    }) as Array<CommandScore<T>>;
  }, [data, options?.keys]);

  return useMemo(() => {
    if (!query) return data;

    const indexOfScoredItems: number[] = [];

    const dataWithScore = dataWithKeywords.map((item, index) => {
      const score = commandScore(item.keywords, query);
      if (score <= 0) return item;

      indexOfScoredItems.push(index);

      return { ...item, score };
    });

    // for better perf, we only sort items with score instead of going through entire list
    const result = indexOfScoredItems
      .reduce(
        (acc, curr) => [...acc, dataWithScore[curr]],
        [] as CommandScore<T>[]
      )
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .map(({ item }) => item);

    return options?.limit ? result.slice(0, options.limit) : result;
  }, [query, data, dataWithKeywords, options?.limit]);
}
