# use-command-score

> Tiny, fast fuzzy ⚡️earch for React applications

Live demo https://use-command-score.vercel.app

## Install

```sh
npm install use-command-score
```

## Usage

```ts
import { useCommandScore } from "use-command-score";

useCommandScore(needle, haystack, options);
```

## Examples

Search array of strings

```ts
useCommandScore("vsc", ["Vim", "Google chrome", "Visual studio code"]); // ['Visual studio code']
```

Search array of objects & limit result [Live demo](https://use-command-score.vercel.app/?path=/story/moviesfuzzysearch--with-limit)

```ts
useCommandScore("hger", movies, {
  limit: 3,
  keys: ["title", "meta.actors", "meta.director"]
});
```

## API

`useCommandScore(needle, haystack, options)`

### needle

Search query

Type: `string`

Required: `true`

### haystack

Array of items to search

Type: `Array<T>`

Required: `true`

### options

Type: `object`

Required: `false`

#### options.keys

Object key paths in `haystack`. The value of the key paths will be matched against `needle`

Type: `Array<string>`

Required: `false`

```ts
const data = [
  { name: "a", address: { code: "123" } },
  { name: "b", address: { code: "456" } }
];

useCommandScore("4", data, { keys: ["name", "address.code"] });
```

#### options.limit

Limits the total results returned

Type: `number`

Required: `false`

```ts
useCommandScore(needle, haystack, { limit: 5 });
```

## Related

- [command score](https://github.com/superhuman/command-score)
