# use-command-score

> Simple, fast fuzzy search hook

Live demo https://use-command-score.vercel.app

## Install

```sh
npm install use-command-score
```

## Usage

```ts
import { useCommandScore } from "use-command-score";

useCommandScore("vsc", ["Vim", "Google chrome", "Visual studio code"]); // ['Visual studio code']
```

## Examples

Match object keys in an array & limit result. [Live demo](https://use-command-score.vercel.app/?path=/story/moviesfuzzysearch--with-limit)

```ts
useCommandScore("hger", movies, {
  limit: 3,
  keys: ["title", "meta.actors", "meta.director"]
});
```

## API

`useCommandScore(query, data, keys, options)`

### query

Search query

Type: `string`

Required: `true`

### data

Array of items to search

Type: `Array<T>`

Required: `true`

### options

Type: `object`

Required: `false`

#### options.keys

Object key paths in `data`. The value of the key paths will be matched against `query`

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
useCommandScore(query, data, { limit: 5 });
```
