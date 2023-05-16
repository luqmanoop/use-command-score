import { renderHook } from "@testing-library/react";

import { useCommandScore } from "src";

const movies = [
  {
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    meta: {
      actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
      director: "Frank Darabont"
    }
  },
  {
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    meta: {
      actors: ["Marlon Brando", "Al Pacino", "James Caan"],
      director: "Francis Ford Coppola"
    }
  },
  {
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    meta: {
      actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      director: "Christopher Nolan"
    }
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    rating: 8.9,
    meta: {
      actors: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
      director: "Peter Jackson"
    }
  }
];

const data = ["apple", "banana", "orange"];

test("original data returned with no query", () => {
  const { result } = renderHook(() => useCommandScore("", data));

  expect(result.current.length).toBe(3);
  expect(result.current).toEqual(data);
});

test("match items", () => {
  const { result } = renderHook(() => useCommandScore("an", data));

  expect(result.current.length).toBe(2);
  expect(result.current).toEqual(data.slice(1));
});

test("limits result", () => {
  const { result } = renderHook(() =>
    useCommandScore("an", data, { limit: 1 })
  );

  expect(result.current.length).toBe(1);
});

test("empty result when no search keys for array of objects", () => {
  const { result } = renderHook(() => useCommandScore("chno", movies));

  expect(result.current.length).toBe(0);
});

test("match query against key path for array of objects", () => {
  const { result } = renderHook(() =>
    useCommandScore("chno", movies, { keys: ["meta.director"] })
  );

  expect(result.current.length).toBe(1);
  expect(result.current[0].meta.director).toEqual("Christopher Nolan");
});
